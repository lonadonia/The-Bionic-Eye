# QA and media scripts

These scripts produced the evidence in `design-handoff/the-bionic-eye-asset-cleaning/qa/` and the exports. They are not part of the site build.

Install the tooling without touching `package.json` or the lockfile:

```bash
npm i --no-save playwright-core axe-core mupdf
```

Browser: the scripts launch the system Google Chrome (`channel: "chrome"`); set `CHROME_PATH` to use another Chromium build. Node 22.6+ is needed for `copy-audit.mjs` (it imports the `.ts` content files directly).

Start the production build first: `npm run build && npm start` (default http://localhost:3000).

| Script | What it does | Example |
|---|---|---|
| `interaction.mjs` | 43 functional, keyboard, reduced-motion and axe-core (WCAG 2.2 AA) checks; film playback checks report SKIP where the browser lacks H.264 | `node scripts/qa/interaction.mjs http://localhost:3000/ qa.json` |
| `copy-audit.mjs` | Matches every string in `src/content/{copy,specs}.ts` against the PDFs' text layers | `node scripts/qa/copy-audit.mjs . "<asset-pack-dir>" audit.json` |
| `copy-deck.mjs` | Turns the audit into the markdown copy deck used in 01 §6 | `node scripts/qa/copy-deck.mjs audit.json deck.md` |
| `capture.mjs` | Per-section screenshots + horizontal-overflow check at given widths | `node scripts/qa/capture.mjs http://localhost:3000/ out 1440,1024,768,390,360 sections` |
| `export.mjs` | Full-page design exports (reduced motion, poster state) | `node scripts/qa/export.mjs http://localhost:3000/ out 1440 1` |
| `png2pdf.mjs` | Wraps an export PNG into a single-page PDF of the same size | `node scripts/qa/png2pdf.mjs in.png out.pdf 1440` |
| `weight.mjs` | Real bytes received on first view (CDP, 20 Mbps throttle) | `node scripts/qa/weight.mjs http://localhost:3000/` |
| `encode-media.sh` | Rebuilds every file in `public/media` from the asset pack (ffmpeg) | `bash scripts/qa/encode-media.sh "<asset-pack-dir>"` |
| `brand-svg.mjs` | Converts the supplied `.ai` logos into the SVG lockups | `node scripts/qa/brand-svg.mjs "<asset-pack-dir>"` |

The mobile "hero + Applications" export is a crop of the 390 @2x full-page export down to the top of `#the-system` (`export.mjs` prints each section's offset).
