// Wraps a PNG export into a single-page PDF of identical CSS-pixel dimensions (no pagination, no margins).
import { chromium } from "playwright-core";
import fs from "node:fs";


const [, , pngPath, pdfPath, cssWidthArg] = process.argv;
const cssWidth = Number(cssWidthArg);
const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }), headless: true });
const page = await browser.newPage();
const src = `data:image/png;base64,${fs.readFileSync(pngPath).toString("base64")}`;
await page.setContent(
  `<!doctype html><html><head><style>@page{margin:0}html,body{margin:0;padding:0;background:#fff}img{display:block;width:${cssWidth}px;height:auto}</style></head><body><img src="${src}"></body></html>`,
  { waitUntil: "load" },
);
const height = await page.evaluate(() => document.querySelector("img").getBoundingClientRect().height);
await page.pdf({ path: pdfPath, width: `${cssWidth}px`, height: `${Math.ceil(height)}px`, printBackground: true, pageRanges: "1" });
await browser.close();
console.log(`${pdfPath}  ${cssWidth}x${Math.ceil(height)} css px  ${fs.statSync(pdfPath).size} bytes`);
