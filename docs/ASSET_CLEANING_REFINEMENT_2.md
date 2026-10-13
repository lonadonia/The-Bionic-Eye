# Asset Cleaning — refinement 2: contest copy, composition and evidence

Internal prototype, 13 October 2026. Brief: `CLAUDE_PROJECT_BRIEF.md` ("Visual refinement of the current Asset Cleaning page"). This document supersedes `docs/ASSET_CLEANING_DESIGN_REFINEMENT.md` ("Precision in Motion") and the copy deck in `design-handoff/…/01_CLIENT_BRIEF_ANALYSIS.md` §6.

**Provenance.** The contest currently prohibits AI-generated layouts and images. This Claude-assisted refinement is an **internal prototype**. It must not be submitted as the entry unless the organiser permits it. Converting it to Figma does not change that.

## 1. Sources used

| Source | Where | Use |
|---|---|---|
| `Asset_Cleaning_Contest_Copy.pdf` ("Asset Cleaning page: contest copy", The Bionic Eye Ltd, October 2026, 2 pp.) | `design-handoff/…/source-reference/` | **The copy authority.** Every visitor-facing product, service, regulatory and company string in `src/content/copy.ts` is copied from it character for character. The only change is the typographic apostrophe. |
| Contest announcement (as summarised in the brief) | — | Section order, section names (Applications, The system, Full service support, Operating legally, Enquiry), hero button `Book a demonstration`, the five service areas |
| Existing repository media (`public/media`, web derivatives of the client pack) | `public/media` | All imagery and film. The original `bionics_` pack is **not** in this environment, so posters were re-chosen from the served derivatives. |
| `C10_Datasheet.pdf` | moved to `design-handoff/…/source-reference/` | Kept for reference only. It is no longer served or linked, because its figures differ from the contest copy (e.g. 11.6 l/min). |
| Screenshot `screencapture-the-bionic-eye-vercel-app-2026-10-13-21_05_03.png` | **not available** in this environment | Replaced by a native-size baseline of the same code at 1440 and 390 (`docs/refinement-2/baseline/`). `the-bionic-eye.vercel.app` was not reachable (egress policy 403). |

## 2. Baseline diagnosis (native captures of `main` @ 95dc5f2)

Page height was 13,974 px at 1440 and 15,039 px at 390.

| Observation | Cause found in code | Fix |
|---|---|---|
| Long empty dark spans in the engineering chapter | `capability-story.tsx` pinned a 3:2 stage (`position: sticky`) beside three text steps. A still capture shows only the first stage frame and isolated text beside empty columns. The dark band also reserved `pb-[clamp(13rem,22vw,20rem)]` for an overlapping product stage | Normal-flow pairing of the two supplied paragraphs with one bounded 16:9 film. The overlap is now a `flow-root` band with a 120px negative-margin panel, so no spacer is needed |
| Film frame "captured on a logo title screen" | The film itself opens on The Bionic Eye's cyan title card. The repo poster (`00:13`) showed an ABZ agricultural drone, not the C10 | New poster: frame 01:46, the whole C10 holding off a façade with its jet visible |
| Black media frames in support | Lazy `next/image` posters never decoded during the full-page capture | Export path waits for every image to decode; `?capture=1` capture state |
| Header drawn mid-page in full captures | Fixed header plus an in-script state swap | Sticky, constant-height dark header; capture state renders it in flow |
| Dense specification table | 48 datasheet rows, a filter, pins and four headline figures, most with no contest source | The five supplied values only (see §4) |

## 3. Source differences (recorded here, not shown to visitors)

| Topic | Contest copy PDF | Announcement / working choice on the page |
|---|---|---|
| Hero button | `Discuss a requirement` | `Book a demonstration` (announcement). `Discuss a requirement` submits the enquiry form |
| Section order | Hero → The system → Applications → What we supply → Regulatory position → Proven in the field → Closing and enquiry | Announcement order: Hero → Applications → The system → Full service support → Operating legally → **Proven in the field** (kept, between regulation and enquiry) → Enquiry |
| Section headings | `What we supply`, `Regulatory position`, `Closing and enquiry` | Announcement names as H2s. `What we supply` is kept as the H3 over the supply paragraphs |
| Header navigation | Solutions, Support, Regulation, Sectors, About Us, Contact, Shop | Labels exactly as supplied. On this single page, Support, Regulation, Sectors and Contact go to their sections and About Us goes to the company details in the footer. Solutions goes to the page top, because no Solutions page exists yet. Shop opens `https://shop.thebioniceye.co.uk` (the store address from the C10 brochure, p. 14) in a new tab |
| `How authorisation works` | Button with no destination supplied | Opens the *Operational Authorisation support* entry in Full service support. **The client must supply the real destination** |
| Enquiry form | Fields only | No form handler exists. A valid submission says plainly that nothing has been sent and never shows success. Name and Email are required (unchanged rule) |
| Spelling | `Facade` (no cedilla), `standardised`, `authorisation` | Used as written. Alt text (designer-written) keeps `façade` only where it described footage before |
| Service areas | The PDF has three supply paragraphs, not five | The five announcement areas select the paragraph that covers them. Paragraphs are never split: Training and OA support share paragraph 2, Servicing and the enhanced warranty share paragraph 3 |

### Removed from the visitor page (no contest source)

These sources stay in git history and `source-reference/`.

- **Hero:** "Clean smarter, safer, higher", the "Meet the ABZ Innovation C10" kicker, the brochure introduction, the benefit rail ("No Scaffolding. / No Height Risks. / No Compromise.") and the "View specifications" link.
- **Applications:** the brochure heading/lede ("Access the Inaccessible…"), the Versatility points, and the roof-moss and gutter tiles (not among the seven supplied applications).
- **The system:** the radar, RTK and washing narrative, "Workflow: A smarter way to work", the 48-row datasheet, the four headline figures, the three part pins and the datasheet download.
- **Operating legally:** the Remote ID/Dronetag line and the "Copy pending" flags.
- **Enquiry:** "Ready to rethink high-altitude cleaning?", the "Interested in" and "Message" fields, and the "Proposed fields" chip.
- **Footer and header:** the dealer line, footer navigation, footer CTA button, "Design preview…" strapline and header phone number.

## 4. What changed, by section

- **Tokens.** Interface tokens as proposed in the brief (`--ink #112634`, `--graphite #29333c`, `--deep-surface #11191d`, `--brand-cyan #00bff3`, `--surface-soft #f3f7f9`, `--text-secondary #54636f`, `--line #dce4e8`, `--link-on-light #00758f`, `--control-border #7b8b98`). Radii are 8 (controls), 10 (media) and 14 (panels). Content is 1280 px with 80 px gutters at 1440 and 20 px at 390. 12/8/4-column grid with 24 px gaps on desktop. Section padding 88→56 px; heading-to-content gap 36→24 px.
- **Type.** Manrope only (DM Sans removed): H1 58→36 px, lh 1.09; H2 42→30; H3 26→22; body 18→17, lh 1.6; labels 15; captions 14–15. The H1 has its own 10.2em measure, measured at 9.6em for "Facade and structure". It therefore sets in three balanced lines from 1024 to 1440, two at 768 and four on phones, never leaving a word alone (checked at nine widths).
- **Header.** Sticky, constant 84/68 px dark bar with a hairline divider and the white stacked lockup (114/96 px wide). The artwork fills its artboard, so its height drives the size. The seven supplied labels appear at ≥1184 px; below that a menu button opens a focus-trapped dialog that closes on Escape. `Book a demonstration` is a distinct cyan button.
- **Hero.** One copy of the content. Phones stack headline → film → both paragraphs → full-width button. From 1024 px the film is a full-bleed background behind a 480→600 px reading zone, under a directional scrim strongest behind the copy and open around the drone and jet. Min height 640→820 px; the hero grows with its content (no `100vh`). The poster is the loop's first frame (C10 rinsing a rooftop array). There is one visible Play/Pause control, which follows actual playback.
- **Applications.** One semantic list of all seven supplied entries in PDF order, placed as a 7/5 · 5/7 grid with rows that share heights (CSS subgrid and container units):
  - Facades: field photograph of the C10 spraying a rendered façade.
  - Solar farms and rooftop arrays: film still over a rooftop array.
  - Industrial silos, tanks and cladding: the UK field clip of green steel cladding, playable.
  - Text-led panel: wind turbine towers, heritage and listed structures, graffiti removal, and surface coating and treatment with *currently in development* kept visible. No photograph in the pack supports these four.
  - Below the grid, the montage and portrait cladding clips share one frame height.
- **The system.** Dark band: accent rule, H2 and both supplied paragraphs beside the C10 Introduction film. The film is 16:9 with corner marks and its new 01:46 poster, sitting 24 px from the copy column. A white stage panel rises over the seam and holds two things:
  - The studio render: `mix-blend-mode: multiply` over a faint 72 px grid that fades at the edges; the drone fills about 77% of the stage width.
  - The five specifications as a `<dl>`: labels 15 px, figures 30→40 px, qualifiers and units 17→20 px in reading order. The pressure row has two lines, 170 bar large and the peak 255 bar smaller.
- **Full service support.** On desktop, the five service areas are a single-choice radio group (arrow keys, Home and End). The selected area gets a 3 px cyan edge, a soft surface, heavier type and an arrow, and it sits level with the "What we supply" paragraphs it highlights. All three paragraphs stay visible and whole. The shared field photograph follows, then three supporting films (TBE Cleaning Van, C10 Academy, Clean Station guide) 40 px below. Order on phones: photograph → selector → paragraphs → films.
- **Operating legally.** A soft panel. The full paragraphs sit at a 52rem measure beside a 2 px graphite rule, with the operator-held sentence in bold, followed by the `How authorisation works` button.
- **Proven in the field.** The intro sentence, then two balanced articles with only the supplied values set in bold. The qualification sits directly below at every width.
- **Enquiry.** 5/7 columns with a 64 px gap. The left column holds the closing paragraph at 22 px and the supplied telephone and email lines. The white form card has 32 px padding and an 8 px control radius. Controls are 54 px tall with 17 px text, the textarea 152 px. Labels are persistent, the error summary links to its fields, and `Discuss a requirement` submits.
- **Footer.** Four groups: logo and operating address (`#about`); telephone, email and specialist brands; the authorisation statements; and the registration line with the registered office, kept separate from the operating address.

### Decoration (three motifs only)

1. A 40 × 2 px cyan accent rule on the six section introductions.
2. 12 px corner marks on the system film only.
3. The faint product-stage grid, on the stage only.

There are no particles, rings, telemetry, badges or fake measurements.

### Motion (CSS plus one observer; no animation library)

| Element | Behaviour |
|---|---|
| Hero text group | 520 ms rise of 14 px, 0/50/150 ms stagger, CSS only (visible without JavaScript) |
| Reveals (section intros, gallery tiles, films, product stage, case articles) | One-shot 500 ms fade + 14 px rise, below the fold only, never replayed. Specifications, legal text and the form are never hidden |
| Playable frames | Hover scale of 1.02 over 420 ms; fine pointers only |
| Header, selector, paragraphs | 180–200 ms colour and edge transitions |
| Smooth scrolling | Only without reduced motion |
| Reduced motion | Disables all of the above and keeps the hero on its poster |
| `?capture=1` | Removes animation, pending reveals and sticky positioning, and hides the hero video so posters show |

**Icons:** the project's own 20 px stroke set (`src/components/icons.tsx`); `ArrowUpRight` added for Shop. No icon library. **Dependencies:** unchanged (`package.json` and lockfile untouched; QA tools are installed with `npm i --no-save`).

## 5. Skills

- `anthropic-skills:elite-design-director` is installed and was loaded. Its quality gates (1440/1024/768/390/360 review, evidence-based statuses, honest delivery status) were applied.
- `frontend-design`, `ui-ux-pro-max` and `webapp-testing` are **not installed** and not in this account's skill catalogue.
- `github.com/anthropics/skills` and the ui-ux-pro-max repository return 403 from this environment, so the maintainers' current install steps could not be read and nothing was installed (**blocked**).
- Browser verification used Playwright with the pre-installed Chromium and the repository's own QA scripts.

## 6. Verification (local production build, `next build` + `next start`)

| Check | Result |
|---|---|
| `npm run lint` · `npm run typecheck` · `npm run build` | Pass (static prerender) |
| `scripts/qa/copy-audit.mjs` against the PDF text layer | 73 strings: 68 verbatim, 5 announcement labels, **0 unverified**. 7/7 applications, 5/5 specifications |
| `scripts/qa/interaction.mjs` (52 checks: structure, nav, CTA under sticky header, film viewers, selector by mouse, keyboard and touch, form validation, no fake success, no network submission, menu dialog, 44 px targets, reduced motion, capture state, no-JS visibility, axe-core WCAG 2.2 AA at 1440 and 390, overflow at 1440/1280/1024/768/720/640/390/360) | **52 pass**. Hero autoplay/pause ran with a VP9 transcode of the same loop (`HERO_TEST_WEBM`), because this Chromium cannot decode H.264. Results: `design-handoff/…/qa/interaction-results.json` |
| `scripts/qa/hero-contrast.mjs`: text over 24 real loop frames with the actual scrim, at 1440/1280/1024 | All pass. Lowest P95: headline 9.5:1, intro 6.1:1 (1024), film control 7.8:1 |
| Headline wrapping at 1440/1280/1024/768/414/390/375/360 | No single trailing word (only 320 px, outside the brief's range, leaves "equipment." alone) |
| First-view transfer (`scripts/qa/weight.mjs`, 20 Mbps) | 421 KB at 1440 and 285 KB at 390 with reduced motion. One 24 KB font file. Media bytes are understated in this Chromium (see `qa/page-weight.txt`) |
| Exports (raster size read back from the files) | `asset-cleaning-1440-full.png` 1440×7758, `.pdf` 1080×5819 pt (one page); `asset-cleaning-1024-full.png` 1024×7171; `asset-cleaning-390@2x-full.png` 780×21310; `asset-cleaning-390@2x-hero-applications.png` 780×6668, `.pdf` 293×2501 pt. Fonts loaded, 14/14 images decoded, 0 pending reveals, 0 playing films at capture |

Before/after at the same scale: `docs/refinement-2/before-after-1440.jpg`. Baseline: `docs/refinement-2/baseline/`.

## 7. Remaining blockers and client inputs

1. **Contest rules:** a genuine Figma view link and a 2–3 minute walkthrough in the entrant's own voice are separate deliverables. This prototype is not an entry (see Provenance).
2. Destination for `How authorisation works`, and real pages for Solutions and About Us.
3. A form handler and a privacy/consent notice. Nothing is collected or sent today.
4. Captions or transcripts for the films with speech (C10 Introduction, C10 Academy, Clean Station guide, TBE Cleaning Van) before production (WCAG 1.2.2).
5. The original `bionics_` pack, to re-cut posters at source resolution. The system and Clean Station posters come from 1280×720 derivatives.
6. Film playback was verified with a VP9 stand-in; check H.264 playback once in Chrome or Safari on the deployed preview.
