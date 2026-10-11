// Measures white-text contrast over the hero background film + scrim, across the whole loop.
// For each sampled frame the text layer is hidden, the hero is screenshotted, and the relative
// luminance of the composited background inside each text box is measured. P95 ignores the brightest
// 5 % of pixels (sparkles, spray highlights); "worst" is the single brightest pixel.
// Usage: node scripts/qa/hero-contrast.mjs http://localhost:3000/ [out.json]   (needs: npm i --no-save playwright-core pngjs)
import { chromium } from "playwright-core";
import { PNG } from "pngjs";
import fs from "node:fs";

const [, , url, outFile] = process.argv;
const SAMPLES = 22; // frames spread evenly across the loop
const targets = {
  "section label (12px caps)": { sel: "#top .section-head p:first-child", need: 4.5 },
  "dealer line (12px caps)": { sel: "#top .section-head p:last-child", need: 4.5 },
  "kicker (12px caps)": { sel: "#top .hero__content .grid-12 p.t-label", need: 4.5 },
  "headline (large)": { sel: "#hero-heading", need: 3 },
  "intro (body)": { sel: "#top .t-lede", need: 4.5 },
};
const channel = (c) => {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const lum = (r, g, b) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const contrastWithWhite = (L) => 1.05 / (L + 0.05);

const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }), headless: true });
const report = { url, ranAt: new Date().toISOString(), viewports: {} };

for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mobile, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    const v = document.querySelector("#top video");
    v.preload = "auto";
    v.load();
  });
  await page.waitForFunction(() => document.querySelector("#top video").readyState >= 2, null, { timeout: 60000 });
  const duration = await page.evaluate(() => document.querySelector("#top video").duration);
  const times = Array.from({ length: SAMPLES }, (_, i) => Number((0.3 + (i * (duration - 0.6)) / (SAMPLES - 1)).toFixed(2)));

  if (process.env.SCRIM_CSS) await page.addStyleTag({ content: fs.readFileSync(process.env.SCRIM_CSS, "utf8") });

  // Measure only where glyphs are: the line boxes of each text node, not the (wider) element box.
  const boxes = await page.evaluate((targets) => {
    const hero = document.querySelector("#top .hero").getBoundingClientRect();
    const out = {};
    for (const [name, { sel }] of Object.entries(targets)) {
      const el = document.querySelector(sel);
      if (!el || el.getBoundingClientRect().width === 0) continue;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const rects = [];
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const r of range.getClientRects()) {
          if (r.width > 1 && r.height > 1) rects.push({ x: r.left - hero.left, y: r.top - hero.top, w: r.width, h: r.height });
        }
      }
      if (rects.length) out[name] = rects;
    }
    return out;
  }, targets);

  const results = Object.fromEntries(Object.keys(boxes).map((k) => [k, { need: targets[k].need, minP95: Infinity, minWorst: Infinity, atTime: null }]));
  for (const t of times) {
    await page.evaluate(async (t) => {
      const v = document.querySelector("#top video");
      await new Promise((res) => {
        v.addEventListener("seeked", res, { once: true });
        v.currentTime = t;
      });
    }, t);
    await page.waitForTimeout(120);
    await page.evaluate(() => {
      document.querySelector("#top .hero__content").style.visibility = "hidden";
      document.querySelector("#top .hero-toggle").style.visibility = "hidden";
    });
    const png = PNG.sync.read(await page.locator("#top .hero").screenshot());
    await page.evaluate(() => {
      document.querySelector("#top .hero__content").style.visibility = "";
      document.querySelector("#top .hero-toggle").style.visibility = "";
    });
    for (const [name, rects] of Object.entries(boxes)) {
      const values = [];
      for (const b of rects) {
        for (let y = Math.max(0, Math.floor(b.y)); y < Math.min(png.height, Math.ceil(b.y + b.h)); y++) {
          for (let x = Math.max(0, Math.floor(b.x)); x < Math.min(png.width, Math.ceil(b.x + b.w)); x++) {
            const i = (y * png.width + x) * 4;
            values.push(lum(png.data[i], png.data[i + 1], png.data[i + 2]));
          }
        }
      }
      values.sort((a, b2) => a - b2);
      const p95 = contrastWithWhite(values[Math.floor(values.length * 0.95)]);
      const worst = contrastWithWhite(values[values.length - 1]);
      const r = results[name];
      if (p95 < r.minP95) {
        r.minP95 = p95;
        r.atTime = t;
      }
      r.minWorst = Math.min(r.minWorst, worst);
    }
  }
  report.viewports[`${w}x${h}`] = results;
  for (const [name, r] of Object.entries(results)) {
    console.log(`${w}px  ${name.padEnd(28)} min P95 ${r.minP95.toFixed(2)}:1 (t=${r.atTime}s)  brightest pixel ${r.minWorst.toFixed(2)}:1  need ${r.need}:1  ${r.minP95 >= r.need ? "PASS" : "FAIL"}`);
  }
  await ctx.close();
}
await browser.close();
if (outFile) fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
