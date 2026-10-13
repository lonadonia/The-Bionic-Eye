// Design exports: full-page PNGs in the static capture state (?capture=1): every reveal shown,
// sticky regions in normal flow, films on their chosen posters, fonts loaded and every image
// decoded before the capture. The raster size is read back from the file, not assumed.
//
// Usage: node scripts/qa/export.mjs http://localhost:3000/ <outDir> [widths=1440,390] [scale=1]
// Needs: npm i --no-save playwright-core pngjs; CHROME_PATH or Google Chrome.
import { chromium } from "playwright-core";
import { PNG } from "pngjs";
import fs from "node:fs";

const [, , url, outDir, widthsArg = "1440,390", scaleArg = "1"] = process.argv;
const widths = widthsArg.split(",").map(Number);
const scale = Number(scaleArg);
const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }),
  headless: true,
});
fs.mkdirSync(outDir, { recursive: true });

for (const w of widths) {
  const mobile = w < 768;
  const ctx = await browser.newContext({
    viewport: { width: w, height: mobile ? 844 : 900 },
    deviceScaleFactor: scale,
    isMobile: mobile,
    hasTouch: mobile,
  });
  const page = await ctx.newPage();
  await page.goto(url + (url.includes("?") ? "&" : "?") + "capture=1", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Visit every part of the page so lazy images request, then wait until each one has decoded.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  const state = await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(imgs.map((img) => (img.complete ? img.decode().catch(() => undefined) : new Promise((r) => img.addEventListener("load", r, { once: true })))));
    return {
      fontsLoaded: document.fonts.status,
      manrope: document.fonts.check('600 16px "Manrope"') || [...document.fonts].some((f) => /manrope/i.test(f.family) && f.status === "loaded"),
      images: imgs.length,
      broken: imgs.filter((i) => !i.naturalWidth).map((i) => i.src),
      pending: document.querySelectorAll('[data-reveal-state="pending"]').length,
      videosPlaying: Array.from(document.querySelectorAll("video")).filter((v) => !v.paused).length,
      offsets: Object.fromEntries(
        Array.from(document.querySelectorAll("main > section, footer")).map((s) => [s.id || "footer", Math.round(s.getBoundingClientRect().top + window.scrollY)]),
      ),
    };
  });
  const file = `${outDir}/asset-cleaning-${w}${scale > 1 ? `@${scale}x` : ""}-full.png`;
  await page.screenshot({ path: file, fullPage: true });
  const png = PNG.sync.read(fs.readFileSync(file));
  console.log(JSON.stringify({ file, raster: `${png.width}x${png.height}`, cssWidth: w, scale, ...state }));
  await ctx.close();
}
await browser.close();
