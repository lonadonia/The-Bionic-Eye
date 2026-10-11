// Design exports: full-page PNGs at fixed widths, in the "paused poster" state.
// Reduced motion is emulated so scroll-driven reveals are static and films show their poster frames.
import { chromium } from "playwright-core";

const [, , url, outDir, widthsArg = "1440,390", scaleArg = "1"] = process.argv;
const widths = widthsArg.split(",").map(Number);
const scale = Number(scaleArg);
const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }), headless: true });

for (const w of widths) {
  const mobile = w < 768;
  const ctx = await browser.newContext({
    viewport: { width: w, height: mobile ? 844 : 900 },
    deviceScaleFactor: scale,
    reducedMotion: "reduce",
    isMobile: mobile,
    hasTouch: mobile,
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(800);
  // Show the default state (background film playing on its opening shot); reveal animations stay off.
  await page.evaluate(async () => {
    const v = document.querySelector("#top video");
    if (!v) return;
    // Full-page capture briefly reports the hero as off-screen, which would pause the film mid-capture.
    // For this static export only, keep it playing so the comp shows the default (playing) state.
    v.pause = () => undefined;
    v.currentTime = 0.2;
    await v.play().catch(() => undefined);
  });
  await page.waitForFunction(() => document.querySelector("#top .hero-toggle")?.getAttribute("aria-label") === "Pause background film", null, { timeout: 15000 });
  await page.waitForTimeout(300);
  const file = `${outDir}/asset-cleaning-${w}${scale > 1 ? `@${scale}x` : ""}-full.png`;
  await page.screenshot({ path: file, fullPage: true });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const offsets = await page.evaluate(() => Object.fromEntries(["top","applications","the-system","full-service-support","operating-legally","enquiry"].map((id) => [id, Math.round(document.getElementById(id).getBoundingClientRect().top + window.scrollY)])));
  console.log(JSON.stringify(offsets));
  console.log(`${file}  ${w}x${h} css px @${scale}x`);
  await ctx.close();
}
await browser.close();
