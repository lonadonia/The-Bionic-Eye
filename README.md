# The Bionic Eye — Asset Cleaning (ABZ C10)

Design-contest preview of the **Asset Cleaning** page for The Bionic Eye Ltd, UK and Ireland dealer for ABZ Innovation, featuring the **ABZ Innovation C10** cleaning drone.

This repository holds a responsive, production-built **coded preview** of the design plus the full contest handoff. The preview supports design evaluation and proves WordPress feasibility; it is **not** the contest's mandatory Figma file or walkthrough recording (see [Contest deliverables](#contest-deliverables)).

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

Next.js 16 (App Router, static) · React 19 · TypeScript · Tailwind CSS 4 · Archivo via `next/font` · no backend.

## Structure

```
src/
  app/            layout, page (mandated section order), tokens (globals.css), favicon
  components/     header/nav, sections/*, video/*, spec group, form, icons
  content/
    copy.ts       every visible word — verbatim client copy with source references
    specs.ts      "Specifications of C10" datasheet, EU column, verbatim
    media.ts      film and photo registry (each item names its source file)
public/
  media/          web derivatives of the client asset pack (video, posters, images, logo SVGs)
  downloads/      C10_Datasheet.pdf
design-handoff/the-bionic-eye-asset-cleaning/
  01–08 *.md      brief analysis, blueprint, master prompt, QA, handoff, Figma spec, walkthrough, design note
  exports/        1440 full-page PNG/PDF; 390 mobile PNG/PDF
  qa/             test results, copy audit, screenshots
scripts/qa/       QA, export and media-pipeline scripts (not part of the build)
```

## Content rules

- Words live only in `src/content/copy.ts` and `src/content/specs.ts`. Every string is verbatim from `C10 Brochure.pdf`, `C10_Datasheet.pdf`, the contest brief, or the hero film's title cards — checked automatically by `scripts/qa/copy-audit.mjs` (current result: 0 unverified).
- British English; localisations are logged in `01_CLIENT_BRIEF_ANALYSIS.md` §6.1.
- Missing client content is shown as a visible "pending" flag, never invented.
- The enquiry form is a **design preview**: it validates input but sends and stores nothing, and says so on screen.

## Media

`public/media` is generated from the client asset pack with `scripts/qa/encode-media.sh` (H.264, faststart, responsive hero sources, labelled excerpts for long films) and `scripts/qa/brand-svg.mjs` (logos from the supplied `.ai` files). The original asset pack is not committed.

All photography, film, logos and the datasheet are © The Bionic Eye Ltd / ABZ Innovation, supplied for this contest. They are not licensed for any other use.

## Deployment (Vercel)

Framework preset **Next.js**, default build (`next build`), no environment variables, no `vercel.json` needed. `/media/*` is served with long-lived immutable cache headers (`next.config.ts`). The page sets `noindex, nofollow` because it is a contest preview, not the client's site. Deployment status: `design-handoff/the-bionic-eye-asset-cleaning/05_GITHUB_VERCEL_HANDOFF.md`.

## Contest deliverables

| Deliverable | Where | Status |
|---|---|---|
| Desktop 1440 full page (PNG/PDF) | `design-handoff/…/exports/asset-cleaning-1440-full.{png,pdf}` | Done |
| Mobile 390, hero + another section | `design-handoff/…/exports/asset-cleaning-390@2x-hero-applications.png`, `…390-hero-applications.pdf` | Done |
| Design note ≤100 words | `design-handoff/…/08_DESIGN_NOTE.md` (94 words) | Done |
| Figma view link | build spec in `06_FIGMA_BUILD_SPEC.md` | **To do by the entrant** — no Figma access was available |
| 2–3 min walkthrough in the entrant's own voice | outline in `07_WALKTHROUGH_OUTLINE.md` | **To do by the entrant** |

## WordPress

Each section maps to core blocks, block patterns and ACF repeaters; tokens map to `theme.json`. See `02_CREATIVE_DESIGN_BLUEPRINT.md` §9.
