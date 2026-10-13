# The Bionic Eye — Asset Cleaning (ABZ C10)

Design-contest preview of the **Asset Cleaning** page for The Bionic Eye Ltd, UK and Ireland dealer for ABZ Innovation, featuring the **ABZ Innovation C10** cleaning drone.

This repository holds a responsive, production-built **coded internal prototype** of the page plus the handoff material. It supports design evaluation and proves WordPress feasibility. It is **not** the contest's mandatory Figma file or walkthrough recording (see [Contest deliverables](#contest-deliverables)).

## Quick start

Requires Node.js ≥ 20.9 (developed on Node 24) and npm.

```bash
npm ci
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm run build        # production build (static prerender)
npm start
```

No environment variables are required (see `.env.example`).

## Stack

Next.js 16 (App Router, static) · React 19 · TypeScript · Tailwind CSS 4 · Manrope via `next/font` (one family) · CSS motion plus one IntersectionObserver (no animation library) · no backend.

Current design and its evidence: [`docs/ASSET_CLEANING_REFINEMENT_2.md`](docs/ASSET_CLEANING_REFINEMENT_2.md) (13 October 2026). It covers the sources used, the differences between the contest copy and the announcement, the content removed for lack of a source, tokens, type, motion and QA results.

**Status:** Claude-assisted **internal prototype**. The contest currently prohibits AI-generated layouts and images, so this build and its exports are not a contest entry unless the organiser permits it.

## Structure

```
src/
  app/            layout (fonts, capture-state flag), page (section order), tokens (globals.css), favicon
  components/     header/nav, sections/*, video/*, support selector, enquiry form, motion, icons
  content/
    copy.ts       every visitor-facing word, verbatim from the contest copy PDF (source keys inline)
    ui.ts         interface labels only (controls, validation, status); no product claims
    media.ts      film and photo registry (each item names its source file and poster frame)
public/
  media/          web derivatives of the client asset pack (video, posters, images, logo SVGs)
design-handoff/the-bionic-eye-asset-cleaning/
  source-reference/  Asset_Cleaning_Contest_Copy.pdf (copy authority), C10_Datasheet.pdf (reference only)
  01–08 *.md      earlier analysis, blueprint, master prompt, QA, handoff, Figma spec, walkthrough, design note
  exports/        1440 full PNG/PDF; 1024 full PNG; 390 @2x full PNG and hero + Applications PNG/PDF
  qa/             interaction results, copy audit, hero contrast, page weight, first-viewport screens
docs/             refinement notes; refinement-2/ holds the native baseline and before/after captures
scripts/qa/       QA, export and media-pipeline scripts (not part of the build)
```

## Content rules

- Every visitor-facing product, service, regulatory and company string lives in `src/content/copy.ts` and is copied from `source-reference/Asset_Cleaning_Contest_Copy.pdf`. The exceptions are the announcement's section names, `Book a demonstration` and the five service areas. `scripts/qa/copy-audit.mjs` checks every string against the PDF's text layer; current result: 0 unverified.
- Exactly five specifications, with their qualifiers. Do not add figures from brochures, datasheets or other C10 versions.
- British English as supplied (e.g. "Facade", "standardised", "authorisation").
- The enquiry form validates input but is not connected to a handler; a valid submission says nothing was sent. It never shows success.

## Media

`public/media` is generated from the client asset pack with `scripts/qa/encode-media.sh` (H.264, faststart; a silent 25 s hero loop cut from `C10-Use-Case-Shorts-Final-Horizontal.mp4` at 1080p/540p; labelled excerpts for long films; operational poster frames) and `scripts/qa/brand-svg.mjs` (logos from the supplied `.ai` files). `/media/*` is served as immutable, so a changed file must get a new name. The original asset pack is not committed.

All photography, film, logos and documents are © The Bionic Eye Ltd / ABZ Innovation, supplied for this contest. They are not licensed for any other use. Manrope is licensed under the SIL Open Font License 1.1 and self-hosted at build time by `next/font/google`.

## Deployment (Vercel)

Framework preset **Next.js**, default build (`next build`), no environment variables, no `vercel.json` needed. `/media/*` is served with long-lived immutable cache headers (`next.config.ts`). The page sets `noindex, nofollow` because it is a contest preview, not the client's site. Deployment status: `design-handoff/the-bionic-eye-asset-cleaning/05_GITHUB_VERCEL_HANDOFF.md`.

## Contest deliverables

| Deliverable | Where | Status |
|---|---|---|
| Desktop 1440 full page (PNG/PDF) | `design-handoff/…/exports/asset-cleaning-1440-full.{png,pdf}` | Done (internal prototype; see Status) |
| Mobile 390, hero + another section | `design-handoff/…/exports/asset-cleaning-390@2x-hero-applications.{png,pdf}`, full page `asset-cleaning-390@2x-full.png` | Done (internal prototype) |
| Design note ≤100 words | `design-handoff/…/08_DESIGN_NOTE.md` (97 tokens) | Done |
| Figma view link | — | **To do by the entrant**: must be the entrant's own work under the contest rules |
| 2–3 min walkthrough in the entrant's own voice | outline in `07_WALKTHROUGH_OUTLINE.md` | **To do by the entrant** |

## WordPress

Each section maps to core blocks, block patterns and ACF repeaters; tokens map to `theme.json`. See `02_CREATIVE_DESIGN_BLUEPRINT.md` §9.
