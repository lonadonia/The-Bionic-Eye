# 03 · Claude Code master prompt

Paste everything below the line into a fresh Claude Code session opened in the repository root.

---

## Mission

You are continuing the **Asset Cleaning page for The Bionic Eye Ltd** (UK and Ireland dealer for ABZ Innovation), featuring the **ABZ Innovation C10 cleaning drone**. The page is a design-contest entry that must remain buildable in WordPress. The repository already contains a working Next.js preview. Your job is to make the requested change **in code**, verify it, commit and push it, and keep the project Vercel-ready. Documentation alone is never the deliverable.

## Read first (source of truth, in priority order)

1. `design-handoff/the-bionic-eye-asset-cleaning/01_CLIENT_BRIEF_ANALYSIS.md` — requirements (REQ-001…042), asset map, approved copy deck, contradictions, assumptions.
2. `02_CREATIVE_DESIGN_BLUEPRINT.md` — the "Field Manual" direction, tokens, type scale, grid, components, motion, WordPress map.
3. `04_QA_ACCEPTANCE_CHECKLIST.md` — the tests that must stay green.
4. `05_GITHUB_VERCEL_HANDOFF.md` — repo, branch, deployment state.
5. Code: `src/content/copy.ts`, `src/content/specs.ts`, `src/content/media.ts` (all words and media), `src/app/globals.css` (tokens), `src/components/**`.

Run `git status`, `git log --oneline -5` and `git remote -v` before editing. Never overwrite uncommitted work you did not make.

## Immovable requirements

- **Section order:** Header → 01 Hero → 02 Applications → 03 The system → 04 Full service support → 05 Operating legally → 06 Enquiry → Footer. Never reorder or drop a section.
- **Copy:** only verbatim client copy from `C10 Brochure.pdf`, `C10_Datasheet.pdf`, the brief, or the hero film's title cards. Do not write, paraphrase or "improve" marketing copy. British English (log any localisation in 01 §6.1). New interface labels must be functional and marked as UI in `copy.ts`.
- **No fabrication:** no invented specifications, figures, claims, certifications, testimonials, logos, photos, videos or regulatory assurances. Where content is missing, show a visible pending flag and list the dependency in 01 §8.3.
- **Hero video:** `C10-Use-Case-Shorts-Final-Horizontal.mp4`, shown as a silent full-bleed background loop behind the headline (`public/media/video/hero-background-loop-*`; edit list in `src/content/media.ts`). Keep the ink scrim and the single pause toggle, and re-run `scripts/qa/hero-contrast.mjs` after any change to the loop, scrim or hero text.
- **Specifications:** the datasheet EU column verbatim (`specs.ts`), including its quirks, until the client corrects it. Headline figures only from values no other source contradicts (see C-1…C-6).
- **CTA label:** "Book a demonstration".
- **Brand:** logo SVGs in `public/media/brand` (converted from the supplied `.ai` files) — do not redraw or recolour. Typeface Archivo. Colours from `globals.css @theme` only.
- **Accessibility:** WCAG 2.2 AA; visible focus; every moving video pausable; reduced motion honoured; one H1.
- **WordPress feasibility:** no behaviour that cannot be rebuilt with core blocks, ACF, and small vanilla scripts.

## Stack and commands

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · npm (lockfile committed) · Node ≥ 20.9.

```
npm ci
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm start
```

Media derivatives are produced from the client asset pack with `scripts/qa/encode-media.sh` (ffmpeg). Never commit the original asset pack.

## Execution sequence

1. **Discover:** read the files above; restate the task as REQ IDs (add new IDs to 01 §7 if the client adds requirements).
2. **Plan:** list files to change; keep changes minimal and in the existing structure.
3. **Build:** implement in code. Copy goes in `src/content/*`; visual tokens in `globals.css`; components in `src/components/*`.
4. **Verify:** `npm run lint`, `npm run typecheck`, `npm run build`. Then run the QA scripts in `scripts/qa/` against `next start` (see `scripts/qa/README.md`): interaction suite (must stay 30/30 or higher), hero contrast probe (all PASS), copy audit (0 unverified), overflow check at 1440/1024/768/390/360, and review screenshots of every changed section at 1440 and 390.
5. **Exports:** if the visual design changed, regenerate `design-handoff/…/exports/` (1440 full PNG + PDF; 390 hero + one section PNG + PDF).
6. **Commit and push:** stage only intended files, scan for secrets, commit with a descriptive message, push normally to `origin` (`https://github.com/lonadonia/The-Bionic-Eye`). Never force-push or rewrite history. If `main` is protected, push a feature branch and open a PR.
7. **Vercel:** the repo is linked to a Vercel project (see 05). Pushes to `main` create a **production** deployment of that project; push to a feature branch for a preview unless the user explicitly asks for production. Verify the deployment state and open the URL before reporting it.
8. **Report:** files changed, commands and results, REQ status changes, screenshots reviewed, commit SHA, branch, deployment URL (only if verified), open blockers.

## Tooling policy

Use what is installed. Prefer CSS for motion; do not add GSAP or UI kits without a clear need and the user's approval. Do not install third-party skills or plugins without approval. Never claim Figma work: this environment has no Figma access unless a Figma tool is visibly available — if not, update `06_FIGMA_BUILD_SPEC.md` instead.

## Definition of done

All MUST requirements still pass; QA suites green; exports current; no new unverified copy; build passes; changes pushed with a real SHA; deployment status reported truthfully; remaining client dependencies listed.

## If asked to build the WordPress version

Follow `02_CREATIVE_DESIGN_BLUEPRINT.md` §9: a block theme with `theme.json` tokens, block patterns per section, a Cover block with background video for the hero, ACF repeaters for spec rows and services, the core Video block, the approved form plugin, and two small vanilla scripts (hero pause/visibility; drawer). Keep the same section order, copy and media. Work in a separate directory or repository, verify locally (e.g. `wp-env`), and never touch the client's live site, DNS or production database without explicit authorisation.
