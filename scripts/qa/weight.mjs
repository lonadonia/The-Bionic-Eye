// Real bytes received per resource type (CDP encodedDataLength), first view, with a throttled "Fast 4G"-like link.
import { chromium } from "playwright-core";
const [, , url] = process.argv;
const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }), headless: true });
for (const [w, rm, waitMs] of [[1440, "reduce", 3000], [390, "reduce", 3000], [1440, "no-preference", 10000], [390, "no-preference", 10000]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 844 : 900 }, reducedMotion: rm, isMobile: w < 768 });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 60, downloadThroughput: (20 * 1024 * 1024) / 8, uploadThroughput: (5 * 1024 * 1024) / 8 });
  const types = new Map(); const byType = {}; let total = 0;
  cdp.on("Network.responseReceived", (e) => types.set(e.requestId, e.type));
  cdp.on("Network.dataReceived", (e) => { const t = types.get(e.requestId) || "Other"; byType[t] = (byType[t] || 0) + e.encodedDataLength; total += e.encodedDataLength; });
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(waitMs);
  const fmt = (b) => (b > 1048576 ? `${(b / 1048576).toFixed(2)} MB` : `${(b / 1024).toFixed(0)} KB`);
  console.log(`w=${w} motion=${rm} after ${waitMs / 1000}s @20 Mbps: ${fmt(total)}  ${JSON.stringify(Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, fmt(v)])))}`);
  await ctx.close();
}
await browser.close();
