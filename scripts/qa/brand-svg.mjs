// Converts the supplied Illustrator logos (PDF-compatible .ai) into the SVG lockups used by the page.
// Usage: node scripts/qa/brand-svg.mjs "<asset-pack-dir>" [public/media/brand]   (needs: npm i --no-save mupdf)
// Output is vector paths only (text converted to outlines), unbound Inkscape attributes stripped.
import * as mupdf from "mupdf";
import fs from "node:fs";
import path from "node:path";

const [, , assetDir, outDir = "public/media/brand"] = process.argv;
fs.mkdirSync(outDir, { recursive: true });

const toSvg = (file) => {
  const doc = mupdf.Document.openDocument(fs.readFileSync(file), "application/pdf");
  const page = doc.loadPage(0);
  const buf = new mupdf.Buffer();
  const writer = new mupdf.DocumentWriter(buf, "svg", "text=path");
  const dev = writer.beginPage(page.getBounds());
  page.run(dev, mupdf.Matrix.identity);
  writer.endPage();
  writer.close();
  return new TextDecoder().decode(buf.asUint8Array())
    .replace(/<\?xml[^>]*>\s*/, "")
    .replace(/\s+xmlns:inkscape="[^"]*"/, "")
    .replace(/ inkscape:[a-zA-Z]+="[^"]*"/g, "");
};

// Crop boxes measured on the 3195 × 2193 pt artboard.
const variants = {
  "tbe-lockup": [478, 348, 2286, 1240], // symbol + wordmark (header, as on thebioniceye.co.uk)
  "tbe-lockup-tagline": [478, 348, 2286, 1415], // + "UNMANNED & UNMATCHED" (footer)
  "tbe-symbol": [478, 348, 2286, 943], // eye symbol only (favicon)
};

for (const [file, tone] of [["BionicEyeLogoLargeBlack2.ai", "ink"], ["BionicEyeLogoLargeWhite.ai", "white"]]) {
  const svg = toSvg(path.join(assetDir, file));
  for (const [name, [x, y, w, h]] of Object.entries(variants)) {
    const out = svg.replace(/<svg([^>]*?)\swidth="[^"]*"\sheight="[^"]*"\sviewBox="[^"]*"/, `<svg$1 width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}"`);
    fs.writeFileSync(path.join(outDir, `${name}-${tone}.svg`), out);
  }
}
console.log(fs.readdirSync(outDir).join("\n"));
