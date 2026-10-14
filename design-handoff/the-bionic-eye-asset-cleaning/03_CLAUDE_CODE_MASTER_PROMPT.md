# 03 · Claude Code master prompt

Paste everything below the line into a fresh Claude Code session opened in the repository root.

---

## Mission

You are continuing the **Asset Cleaning page for The Bionic Eye Ltd** (UK and Ireland dealer for ABZ Innovation), featuring the **ABZ Innovation C10 cleaning drone**. The page is a design-contest entry that must remain buildable in WordPress. The repository already contains a working Next.js preview. Your job is to make the requested change **in code**, verify it, commit and push it, and keep the project Vercel-ready. Documentation alone is never the deliverable.

## Read first (source of truth, in priority order)

1. `design-handoff/the-bionic-eye-asset-cleaning/source-reference/Asset_Cleaning_Contest_Copy.pdf` — the client's contest copy. **Use its text exactly as written.**
2. `docs/ASSET_CLEANING_REFINEMENT_4.md` — latest changes (Applications balance, films in place, ornaments) — then `docs/ASSET_CLEANING_REFINEMENT_3.md` — the design (product explorer, cleaning-system scene, decoration layers), full-resolution asset map, motion, skills and verification.
3. `docs/ASSET_CLEANING_REFINEMENT_2.md` §3 — source differences (announcement vs PDF) and removed content.
4. `design-handoff/the-bionic-eye-asset-cleaning/qa/` — current QA evidence; `scripts/qa/README.md` for how to rerun it.
5. `05_GITHUB_VERCEL_HANDOFF.md` — repo, branch, deployment state.
6. Code: `src/content/copy.ts` (every visitor-facing word), `src/content/ui.ts` (interface labels only), `src/content/media.ts`, `src/app/globals.css` (tokens), `src/components/**`.

Run `git status`, `git log --oneline -5` and `git remote -v` before editing. Never overwrite uncommitted work you did not make.

## Immovable requirements

- **Provenance:** this is a Claude-assisted **internal prototype**. The contest currently prohibits AI-generated layouts and images; never present it, its exports or a Figma conversion of it as the entry unless the organiser permits it.
- **Section order:** Header → Hero → Applications → The system → Full service support → Operating legally → Proven in the field → Enquiry → Footer.
- **Copy:** only the contest copy PDF, character for character (typographic apostrophes allowed), plus the announcement's section names, `Book a demonstration` and the five service areas. No brochure or datasheet wording, slogans, extra figures, testimonials, logos, pricing, guarantees or certifications. `scripts/qa/copy-audit.mjs` must report 0 unverified.
- **Hero:** headline `Facade and structure cleaning without access equipment.`, both opening paragraphs complete, one `Book a demonstration` button, film = loop cut from `C10-Use-Case-Shorts-Final-Horizontal.mp4` with an operational poster and a Play/Pause control that has no visible button (owner's request) but appears on keyboard focus, plus `Watch the full film` opening the complete supplied film in the media viewer. Rerun `scripts/qa/hero-contrast.mjs` after changing the loop, scrim or hero text.
- **Specifications:** exactly the five supplied rows with all qualifiers (`Over`, `Up to`, `Around … up to … at peak`), always visible.
- **Applications:** all seven entries, including `Surface coating and treatment, currently in development`. Never relabel an unrelated photograph as evidence for an entry. Everything stays inside the page frame; its films play in place as silent loops with no labels over the pictures (pause and watch-with-sound icons on hover/focus).
- **Support:** five service areas; the three supplied paragraphs stay whole and visible.
- **Form:** fields Name, Company, Email, Telephone, Sites or work involved; submit `Discuss a requirement`. No handler exists: never show a success state or add fields.
- **Design system:** Manrope only; tokens in `globals.css`; dark ink text on cyan. Decoration stays in its three tied layers (brand, technical, depth; refinement 3 §4). Callouts only on parts identified in the photograph itself; no measurements, coordinates, telemetry or counters.
- **Media truth:** only supplied photographs and frames of supplied films, cropped and converted; no generated, composited or sharpened imagery. The explorer shows three real angles (no 3D, no rotation).
- **Media:** a changed file in `public/media` gets a new file name (it is served as immutable).
- **Accessibility:** WCAG 2.2 AA; visible focus; every moving film pausable; reduced motion and `?capture=1` honoured; one H1.
- **WordPress feasibility:** no behaviour that cannot be rebuilt with core blocks, ACF and small vanilla scripts.

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
4. **Verify:** `npm run lint`, `npm run typecheck`, `npm run build`. Then run the QA scripts in `scripts/qa/` against `next start` (see `scripts/qa/README.md`): interaction suite (52 checks, all PASS), hero contrast probe (all PASS), copy audit (0 unverified), and review screenshots of every changed section at 1440, 1024 and 390.
5. **Exports:** if the visual design changed, regenerate `design-handoff/…/exports/` with `scripts/qa/export.mjs` (capture state; 1440 full PNG + PDF; 390 @2x full and hero + Applications PNG + PDF) and read back the raster sizes.
6. **Commit and push:** stage only intended files, scan for secrets, commit with a descriptive message, push normally to `origin` (`https://github.com/lonadonia/The-Bionic-Eye`). Never force-push or rewrite history. If `main` is protected, push a feature branch and open a PR.
7. **Vercel:** the repo is linked to a Vercel project (see 05). Pushes to `main` create a **production** deployment of that project; push to a feature branch for a preview unless the user explicitly asks for production. Verify the deployment state and open the URL before reporting it.
8. **Report:** files changed, commands and results, REQ status changes, screenshots reviewed, commit SHA, branch, deployment URL (only if verified), open blockers.

## Tooling policy

Use what is installed. GSAP + ScrollTrigger + `@gsap/react` drive the cleaning-system scene and the few entrances (`useGSAP`, `gsap.matchMedia`, cleanup on unmount); use CSS for simple states and never add a second animation library or global smooth scrolling. Do not add UI kits without a clear need and the user's approval. Do not install third-party skills or plugins without approval. Never claim Figma work that was not done through an available, authorised Figma tool, and never substitute a flattened screenshot for editable layers.

## Definition of done

All MUST requirements still pass; QA suites green; exports current; no new unverified copy; build passes; changes pushed with a real SHA; deployment status reported truthfully; remaining client dependencies listed.

## If asked to build the WordPress version

Follow `02_CREATIVE_DESIGN_BLUEPRINT.md` §9: a block theme with `theme.json` tokens, block patterns per section, a Cover block with background video for the hero, ACF repeaters for spec rows and services, the core Video block, the approved form plugin, and two small vanilla scripts (hero pause/visibility; drawer). Keep the same section order, copy and media. Work in a separate directory or repository, verify locally (e.g. `wp-env`), and never touch the client's live site, DNS or production database without explicit authorisation.
