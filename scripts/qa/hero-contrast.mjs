// Hero text contrast over the real background film, at every desktop width where the copy sits on it.
//
// Geometry comes from the running page (the line boxes of the actual glyphs, the hero size and the
// computed scrim). Frames come from the served loop itself (ffmpeg, evenly spaced across the loop),
// cropped exactly as `object-fit: cover; object-position` does, then composited under the scrim
// gradients. This avoids depending on the browser's H.264 support. P95 ignores the brightest 5% of
// pixels under a line (spray highlights); "brightest" is the single worst pixel. The eye watermark
// is counted conservatively: a flat layer of its white at its opacity over its whole bounding box.
//
// Usage: node scripts/qa/hero-contrast.mjs http://localhost:3000/ [out.json]
// Needs: npm i --no-save playwright-core pngjs; ffmpeg on PATH; CHROME_PATH or Google Chrome.
import { chromium } from "playwright-core";
import { PNG } from "pngjs";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const [, , url, outFile] = process.argv;
const SAMPLES = 24;
const WIDTHS = [1440, 1280, 1024];
const LOOP = "public/media/video/hero-background-loop-1080.mp4";
const targets = {
  headline: { sel: "#hero-heading", need: 3 },
  "intro paragraph 1": { sel: "#top .hero__intro p:nth-child(1)", need: 4.5 },
  "intro paragraph 2": { sel: "#top .hero__intro p:nth-child(2)", need: 4.5 },
  "full film control": { sel: "#top .hero__control--full", need: 4.5 },
};

const channel = (c) => {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const lum = (r, g, b) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const contrastWithWhite = (L) => 1.05 / (L + 0.05);

// Extract frames once (full 1920x1080), as PNG.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hero-frames-"));
const duration = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", LOOP]).toString());
const times = Array.from({ length: SAMPLES }, (_, i) => Number((0.2 + (i * (duration - 0.4)) / (SAMPLES - 1)).toFixed(2)));
const frames = times.map((t, i) => {
  const file = path.join(tmp, `f${i}.png`);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-ss", String(t), "-i", LOOP, "-frames:v", "1", file]);
  return { t, png: PNG.sync.read(fs.readFileSync(file)) };
});

const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }),
  headless: true,
});
const report = { url, ranAt: new Date().toISOString(), samples: times, viewports: {} };

for (const w of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(url + (url.includes("?") ? "&" : "?") + "capture=1", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const geo = await page.evaluate((targets) => {
    const media = document.querySelector("#top .hero__media");
    const m = media.getBoundingClientRect();
    const poster = document.querySelector("#top .hero__poster");
    const pos = getComputedStyle(poster).objectPosition.split(" ").map((v) => parseFloat(v) / 100);
    const scrim = getComputedStyle(document.querySelector("#top .hero__scrim")).backgroundImage;
    const out = {};
    for (const [name, { sel }] of Object.entries(targets)) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const rects = [];
      if (name.endsWith("control")) {
        // Measure under the label text only, through the control group's translucent backing.
        const label = el.querySelector("span:nth-child(2)");
        const r = label.getBoundingClientRect();
        rects.push({ x: r.left - m.left, y: r.top - m.top, w: r.width, h: r.height });
        const bg = getComputedStyle(el.closest(".hero__controls") ?? el).backgroundColor.match(/[\d.]+/g).map(Number);
        out.__controlBacking = { rgb: bg.slice(0, 3), a: bg[3] ?? 1 };
      } else {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          for (const r of range.getClientRects()) {
            if (r.width > 1 && r.height > 1) rects.push({ x: r.left - m.left, y: r.top - m.top, w: r.width, h: r.height });
          }
        }
      }
      out[name] = rects;
    }
    const mark = document.querySelector("#top .hero__mark");
    const mr = mark?.getBoundingClientRect();
    const markBox = mr && mr.width ? { x: mr.left - m.left, y: mr.top - m.top, w: mr.width, h: mr.height, a: Number(getComputedStyle(mark).opacity) } : null;
    return { W: m.width, H: m.height, pos, scrim, rects: out, markBox };
  }, targets);

  // Parse the two scrim gradients: a 90deg horizontal one and a 0deg (bottom-up) one.
  const grads = [...geo.scrim.matchAll(/linear-gradient\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g)].map((g) => {
    const body = g[1];
    const angle = body.startsWith("90deg") ? 90 : 0;
    const stops = [...body.matchAll(/rgba?\(([^)]+)\)\s*([\d.]+)%/g)].map((s) => {
      const parts = s[1].split(/[\s,/]+/).filter(Boolean).map(Number);
      return { rgb: parts.slice(0, 3), a: parts[3] ?? 1, at: Number(s[2]) / 100 };
    });
    return { angle, stops };
  });
  const sample = (stops, p) => {
    if (p <= stops[0].at) return stops[0];
    for (let i = 1; i < stops.length; i++) {
      if (p <= stops[i].at) {
        const a = stops[i - 1];
        const b = stops[i];
        const k = (p - a.at) / (b.at - a.at || 1);
        return { rgb: a.rgb.map((c, j) => c + (b.rgb[j] - c) * k), a: a.a + (b.a - a.a) * k };
      }
    }
    return stops[stops.length - 1];
  };

  // object-fit: cover mapping from hero pixel to frame pixel.
  const fw = frames[0].png.width;
  const fh = frames[0].png.height;
  const scale = Math.max(geo.W / fw, geo.H / fh);
  const offX = (geo.W - fw * scale) * geo.pos[0];
  const offY = (geo.H - fh * scale) * geo.pos[1];

  const backing = geo.rects.__controlBacking;
  delete geo.rects.__controlBacking;
  const results = {};
  for (const [name, rects] of Object.entries(geo.rects)) {
    let minP95 = Infinity;
    let minWorst = Infinity;
    let atTime = null;
    for (const { t, png } of frames) {
      const values = [];
      for (const b of rects) {
        for (let y = Math.max(0, Math.floor(b.y)); y < Math.min(geo.H, Math.ceil(b.y + b.h)); y++) {
          for (let x = Math.max(0, Math.floor(b.x)); x < Math.min(geo.W, Math.ceil(b.x + b.w)); x++) {
            const sx = Math.min(fw - 1, Math.max(0, Math.floor((x - offX) / scale)));
            const sy = Math.min(fh - 1, Math.max(0, Math.floor((y - offY) / scale)));
            const i = (sy * fw + sx) * 4;
            let c = [png.data[i], png.data[i + 1], png.data[i + 2]];
            // Paint order: later background layers sit underneath, so composite the last first.
            for (const g of [...grads].reverse()) {
              const p = g.angle === 90 ? x / geo.W : 1 - y / geo.H;
              const s = sample(g.stops, p);
              c = c.map((v, j) => v * (1 - s.a) + s.rgb[j] * s.a);
            }
            const mb = geo.markBox;
            if (mb && x >= mb.x && x < mb.x + mb.w && y >= mb.y && y < mb.y + mb.h) c = c.map((v) => v * (1 - mb.a) + 255 * mb.a);
            if (name.endsWith("control") && backing) c = c.map((v, j) => v * (1 - backing.a) + backing.rgb[j] * backing.a);
            values.push(lum(...c));
          }
        }
      }
      values.sort((a, b2) => a - b2);
      const p95 = contrastWithWhite(values[Math.floor(values.length * 0.95)]);
      const worst = contrastWithWhite(values[values.length - 1]);
      if (p95 < minP95) {
        minP95 = p95;
        atTime = t;
      }
      minWorst = Math.min(minWorst, worst);
    }
    const need = targets[name].need;
    results[name] = { need, minP95: Number(minP95.toFixed(2)), brightestPixel: Number(minWorst.toFixed(2)), atTime, pass: minP95 >= need };
    console.log(`${w}px  ${name.padEnd(20)} min P95 ${minP95.toFixed(2)}:1 (t=${atTime}s)  brightest pixel ${minWorst.toFixed(2)}:1  need ${need}:1  ${minP95 >= need ? "PASS" : "FAIL"}`);
  }
  report.viewports[`${w}x900`] = results;
  await ctx.close();
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
if (outFile) fs.writeFileSync(outFile, JSON.stringify(report, null, 2));
