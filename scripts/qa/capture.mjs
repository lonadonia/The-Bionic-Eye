// QA capture: per-section screenshots + full page in the static capture state, console/network errors, overflow check.
import { chromium } from "playwright-core";
const [,, url, outDir, widthsArg = "1440,390", mode = "sections"] = process.argv;
const widths = widthsArg.split(",").map(Number);
const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }), headless: true });
for (const w of widths) {
  const mobile = w < 768;
  const ctx = await browser.newContext({
    viewport: { width: w, height: mobile ? 844 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    isMobile: mobile,
    hasTouch: mobile,
  });
  const page = await ctx.newPage();
  const logs = [];
  page.on("console", (m) => { if (["error", "warning"].includes(m.type())) logs.push(`[console.${m.type()}] ${m.text()}`); });
  page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));
  page.on("requestfailed", (r) => logs.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`));
  page.on("response", (r) => { if (r.status() >= 400) logs.push(`[http ${r.status()}] ${r.url()}`); });
  await page.goto(url + (url.includes("?") ? "&" : "?") + "capture=1", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Trigger lazy images by scrolling through the page, then return to top.
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(600);
  const overflow = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h: document.documentElement.scrollHeight }));
  console.log(`w=${w} scrollWidth=${overflow.sw} clientWidth=${overflow.cw} height=${overflow.h} ${overflow.sw > overflow.cw ? "OVERFLOW!" : "no-overflow"}`);
  await page.screenshot({ path: `${outDir}/fold-${w}.png` });
  if (mode === "sections" || mode === "both") {
    const ids = ["top", "applications", "system", "support", "regulation", "evidence", "enquiry"];
    for (const id of ids) {
      const el = await page.$(`#${id}`);
      if (el) await el.screenshot({ path: `${outDir}/sec-${w}-${id}.png` });
    }
    const header = await page.$("header"); if (header) await header.screenshot({ path: `${outDir}/sec-${w}-header.png` });
    const footer = await page.$("footer"); if (footer) await footer.screenshot({ path: `${outDir}/sec-${w}-footer.png` });
  }
  if (mode === "full" || mode === "both") await page.screenshot({ path: `${outDir}/full-${w}.png`, fullPage: true });
  for (const l of logs) console.log(`  ${l}`);
  await ctx.close();
}
await browser.close();
