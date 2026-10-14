# QA and media scripts

These scripts produced the evidence in `design-handoff/the-bionic-eye-asset-cleaning/qa/` and the exports. They are not part of the site build.

Install the tooling without touching `package.json` or the lockfile:

```bash
npm i --no-save playwright-core axe-core mupdf pngjs
```

Browser: the scripts launch the system Google Chrome (`channel: "chrome"`); set `CHROME_PATH` to use another Chromium build. Node 22.18+ is needed for `copy-audit.mjs` (it imports the `.ts` content files directly).

Start the production build first: `npm run build && npm start` (default http://localhost:3000).

| Script | What it does | Example |
|---|---|---|
| `interaction.mjs` | 63 functional, keyboard, touch, reduced-motion, capture-state, no-JS, overflow and axe-core (WCAG 2.2 AA) checks, including the media viewer, product explorer, cleaning-system scene and the films that play in place in Applications. Hero playback is reported SKIP where the browser lacks H.264, unless `HERO_TEST_WEBM` points to a VP9 transcode of the loop (test-only stand-in) | `HERO_TEST_WEBM=hero.webm node scripts/qa/interaction.mjs http://localhost:3000/ qa.json` |
| `copy-audit.mjs` | Matches every visitor-facing string in `src/content/copy.ts` against the contest copy PDF in `design-handoff/…/source-reference/` | `node scripts/qa/copy-audit.mjs audit.json` |
| `hero-contrast.mjs` | White-text contrast over 24 frames of the served hero loop (ffmpeg and ffprobe on PATH) under the page's actual scrim, with the eye watermark counted conservatively, at 1440/1280/1024 | `node scripts/qa/hero-contrast.mjs http://localhost:3000/ out.json` |
| `export.mjs` | Full-page exports in the static capture state (`?capture=1`), after fonts and every image have decoded; prints the real raster size | `node scripts/qa/export.mjs http://localhost:3000/ out 1440,1024 1` |
| `capture.mjs` | Per-section screenshots + horizontal-overflow check at given widths | `node scripts/qa/capture.mjs http://localhost:3000/ out 1440,1024,768,390,360 sections` |
| `png2pdf.mjs` | Wraps an export PNG into a single-page PDF of the same size | `node scripts/qa/png2pdf.mjs in.png out.pdf 1440` |
| `weight.mjs` | Real bytes received on first view (CDP, 20 Mbps throttle) | `node scripts/qa/weight.mjs http://localhost:3000/` |
| `encode-media.sh` | Rebuilds every file in `public/media` from the asset pack (ffmpeg) | `bash scripts/qa/encode-media.sh "<asset-pack-dir>"` |
| `brand-svg.mjs` | Converts the supplied `.ai` logos into the SVG lockups | `node scripts/qa/brand-svg.mjs "<asset-pack-dir>"` |

Make the VP9 stand-in with `ffmpeg -i public/media/video/hero-background-loop-540.mp4 -t 8 -c:v libvpx-vp9 -b:v 600k -an hero.webm`. The mobile "hero + Applications" export is a crop of the 390 @2x full-page export down to the top of `#system` (`export.mjs` prints each section's offset).
