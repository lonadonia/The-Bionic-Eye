# Asset Cleaning — refinement 3: a richer C10 product experience

Internal prototype, 14 October 2026. Brief: `CLAUDE_PROJECT_BRIEF (1).md` ("Build a richer C10 product experience", updated 13 October 2026). This document supersedes the visual direction of `docs/ASSET_CLEANING_REFINEMENT_2.md`. The copy, the source reconciliation (its §3) and the removed-content list are unchanged.

**Provenance.** The contest currently prohibits AI-generated layouts and images. This Claude-assisted refinement is an **internal prototype**. It must not be submitted as the entry unless the organiser permits it. No image on the page was generated or composited: every picture is a supplied photograph or a frame of a supplied film, cropped and converted only.

## 1. Starting point

- The local copy was fast-forwarded from `fa6ca55` to GitHub `main` at `c6d4f45` (refinement 2 plus its handoff note). There was no local work to merge.
- Baseline: native captures of `c6d4f45` at 1440 and 390, made by the previous session with this project's export script. They are in `docs/refinement-3/baseline/`, and `docs/refinement-3/before-after-1440.jpg` sets them beside the result at the same scale.
- This time the original asset pack (`contests/7`, ≈ 3 GB) was available locally. Every new derivative was therefore cut from the full-resolution originals, not from earlier web derivatives.

### Baseline diagnosis

| Observation (baseline) | Fix in this refinement |
|---|---|
| The C10 appears once, as a small studio render beside a list | A 760 px white stage with three real angles, a measured nozzle callout and two close-ups always in view |
| Films read as a row of similar thumbnails | Each film is attached to what it explains: the full hero film in a viewer, guide footage beside its stills, the van film as a large support viewer |
| Ground equipment and the nozzle are never shown | A pair of 4K frames from the supplied Clean Station guide (the drone at work, the ground unit), plus a 4K zoom on the nozzle |
| Decoration limited to small accent rules | Three tied layers: brand (cyan plane, eye watermark, edge rules), technical (grid fragments, framing marks, callouts) and depth (stage, overlapping frames, planes) |

## 2. Asset map (inspected at full resolution)

| Supplied file | Original | Role on the page | Derivative(s) |
|---|---|---|---|
| `C10-Use-Case-Shorts-Final-Horizontal.mp4` | 3840 × 2160, 83.4 s, H.264 + AAC | Hero environment; full film in the viewer | Existing 25 s silent loop (1080/540). New `hero-c10-use-cases-full-720.mp4`: the complete film with its title cards and sound (12.9 MB, loaded only when opened) |
| `C10-2.png` | 8640 × 5760, studio, pure white (255) | Explorer: **Side** view (default) | `product-c10-side.jpg` 1920 × 1200 (crop 7754 × 4846 at 94, 594). Nozzle measured at (0.884, 0.551) |
| `C10-5.png` | 8640 × 5760 | Explorer: **Three-quarter** view | `product-c10-three-quarter.jpg` 1920 × 1200. The nozzle is hidden in this view, so it has no callout |
| `C10.png` | 8640 × 5760 (drone small in frame) | Explorer: **Front** view, looking along the lance | `product-c10-front.jpg` 1920 × 1200 (crop 5652 × 3533 at 1440, 1469). Nozzle at (0.516, 0.82) |
| `C10-7.png` | 8640 × 5760, underside macro | Detail frame: nozzle, lance, hose coupling | `detail-c10-nozzle-studio.jpg` 1200 × 900 from a 2880 × 2160 source region (2.4× oversampled, no sharpening) |
| `865A0018.jpg` | 2048 × 1378 | Detail frame: the nozzle and jet in operation | `detail-c10-nozzle-operation.jpg` 1024 × 768, a native-resolution crop |
| `C10 3.jpg` | 6000 × 3376 | Applications: featured facade and glazing frame | `app-facade-glazing.jpg` 2000 × 1125 |
| `IMG_2224.JPG` | 4032 × 3024 | Support: shown for *Sales* (the drone itself, on site) | `support-c10-ready.jpg` 1600 × 1200 |
| `IMG_2240.JPG` | 5712 × 4284 | Support: shared field photograph (OA support, servicing, warranty) | Existing |
| `ABZ Clean Station _ Full Setup & Operation Guide.mp4` | 3840 × 2160, AV1, 349.4 s | Cleaning-system pair: **05:16** the C10 holding off a rendered wall with its jet on the wall and its hose to the ground; **00:22** the ground unit (hose reel, pump with gauge, ABZ tank, blue vessel, water-treatment units) | `system-operation-0516.jpg` 2880 × 1620; `system-clean-station-0022.jpg` 1800 × 1108 (cropped clear of the guide's corner logo); new excerpt `system-clean-station-operation-excerpt.mp4` (05:10–05:49, 39 s); existing setup excerpt (00:00–01:15) |
| `C10_Introduction_short.mp4` | 1920 × 1080, 143 s | Applications film strip | Existing |
| `C10 Short Low bitrate.mp4`, `5f69a5e2-….MP4`, `IMG_2236.MOV` | — | Applications: film strip and the playable cladding tile | Existing |
| `C10 Academy.mp4` | 1920 × 1080, 304 s | Support: plays when *Training* is selected | Existing excerpt |
| `TBE_Cleaning_Van-Compressed2.mp4` | 1920 × 1080, 657 s | Support: large technician and van viewer | Existing excerpt |
| `BionicEyeLogoLarge*.ai` | vector | Header, footer, and the eye symbol as a watermark (unaltered, original proportions) | Existing SVGs |

The guide's frames were reviewed on contact sheets across the whole film. Its in-template frames (orange headings, burned-in steps and pressure figures) were avoided, because they would put unsupplied figures on the page. Only part names that are plainly visible, and that the copy or a supplied title names, are labelled: "Nozzle" (the copy's "at the nozzle") and "ABZ Clean Station" (the guide's title). No sensor, radar or component position is guessed.

## 3. The three signature experiences

1. **Operational hero.** The full-bleed loop runs behind a protected reading zone. Identity layers frame it:
   - the supplied eye symbol, cropped off the darkest bottom-left corner at 9% white;
   - a fine frame boundary at the content edges, with framing marks;
   - one cyan edge rule along the bottom, under the reading group.

   A control group (Play/Pause, then **Watch the full film 01:23**) opens the complete supplied film in the media viewer. The hero is content-driven: 806 px at 1440, 711 px at 1024. On phones the order is headline → film → both paragraphs → full-width button, on one dark surface.
2. **Product exploration** (in *The system*):
   - **Stage.** A 760 × 475 px white stage on a broad cyan plane that is cropped at the page edge. The studio photographs' own white multiplies over a faint grid, so there is no pasted rectangle.
   - **View selector.** A single-choice group (radio semantics, arrow keys, touch) with real thumbnails switches between three real angles on one fixed 16:10 canvas, with a 260 ms crossfade.
   - **Callouts.** A ring, connector and label mark the nozzle on the side and front views.
   - **Close-ups.** Two detail frames sit below the stage at all times: the studio macro and the same part in operation, each with its nozzle marked.
3. **Cleaning-system story.** A 60/40 asymmetric pair of 4K frames from the guide: the C10 at work on its hose, and the Clean Station it is fed from. Each frame has a caption naming its source and timecode, and a **Play film** button for the matching guide footage. On desktop with motion allowed, the pair becomes one bounded scroll scene (§6).

## 4. Design system

- **Type.** Manrope only (next/font, weights 400–700): H1 58 px / 1.09; H2 30 → 46 px; section leads 22 → 26 px; body 17 → 18 px / 1.6; specification figures 36 → 50 px with qualifiers 18 → 21 px; captions 14–15 px.
- **Tokens.** Unchanged palette: `#11191D`, `#29333C`, `#112634`, `#00BFF3`, `#FFFFFF`, `#F3F7F9`, `#54636F`, `#00758F`. New radii (8 controls, 12 media, 16 panels, 20 stage) and one media shadow token.
- **Layout.** Content max 1280 px, 80 px gutters at 1440 and 20 px at 390; 12 columns with 24 px gaps.
- **Icons.** The project's own 20 px stroke set (`src/components/icons.tsx`). No icon library.

### Decoration layers

| Layer | Where | What |
|---|---|---|
| Brand | Hero, system, support, legal, enquiry | Cyan plane behind the product stage (with a white grid fragment); eye watermark in the hero and enquiry; cyan edge rules (hero bottom, specification panel, support media edge, van caption, legal sheet); a cyan plane behind the form card's top edge |
| Technical | Hero, applications panel, stage, callouts, support | Hero frame boundary and framing marks; grid fragment and corner marks on the text-led applications panel; faded stage grid and stage framing marks; nozzle callouts; grid plane behind the support media |
| Depth | System, support | Large white stage over the cyan plane, a lowered second detail frame, overlapping planes, restrained ambient shadows |

No measurements, coordinates, tracking markers, telemetry, counters or badges are drawn anywhere.

## 5. Section changes

- **Applications.** A 7/5 then 6/6 editorial grid in the supplied order:
  - Facades: the featured `C10 3.jpg` frame runs out to the page edge while its caption stays on the grid.
  - Solar: the solar array still.
  - Industrial silos, tanks and cladding: the playable cladding clip.
  - Wind turbine towers, heritage, graffiti and coating share one framed, text-led panel (*currently in development* is kept).

  A film strip of real viewers follows: C10 Short, C10 Introduction and the portrait cladding clip, at one shared frame height.
- **The system.**
  - Desktop: the introduction paragraph, then the specification panel, run in the left column beside the explorer and detail frames. Below them sits the cleaning-system pair or scene.
  - Phones: introduction → stage and details → specification → pair. Imagery comes early, and the source order matches the visual order.
  - The specification panel shows the five supplied values with dominant figures (60, 15, 170, Radar, 29). The pressure row keeps "Around … at the nozzle," and "up to 255 bar at peak" on two lines, and the MTOM / UK SORA paragraph follows the panel.
- **Full service support.**
  - The selector, the "What we supply" heading and all three paragraphs (intact, the covering one highlighted) are at left.
  - A 4:3 media surface with a cyan structural edge is at right. It crossfades in 240 ms: Sales shows `IMG_2224`, Training plays C10 Academy, and the other three keep the shared field photograph.
  - Below is the TBE Cleaning Van film at 8 columns.
- **Operating legally.** A document-style white sheet on the soft band: a cyan top edge, a measured rule above `How authorisation works`, and the complete text.
- **Proven in the field.** Two separated articles at 19 → 22 px. The supplied values are bold with a faint cyan underlay, inside their sentences, and the qualification is directly below.
- **Enquiry and footer.** A dark close with the eye watermark and a cyan plane behind the white form card. The five fields, `Discuss a requirement` and the no-endpoint behaviour are unchanged.

## 6. Motion (GSAP 3.15 + ScrollTrigger + @gsap/react)

| Region | Behaviour |
|---|---|
| Hero | CSS entrance (520 ms, 50 ms stagger). Visible without JavaScript; the footage is stable |
| Applications | Media tiles below the fold arrive once in a 75 ms stagger, 22 px rise (`ScrollTrigger.batch`) |
| Product stage | A 700 ms settle, then the detail frames open (clip-path) and the callouts appear after their images |
| Alternate view | CSS crossfade, 260 ms, on a fixed canvas |
| Cleaning-system scene (≥ 1024 px, motion allowed) | Pins for 110 % of the viewport and steps through 1 *In operation* (the operation frame fills the stage) → 2 *Nozzle* (a 1.9× zoom on the same 4K frame, with the callout counter-scaled to stay at its true size) → 3 *With the Clean Station* (the pair). Discrete states, 850 ms, never scrubbed video. Visible controls (radio group, arrow keys) give the same views without scrolling. React state changes only when the view changes |
| Support | 240 ms media and caption crossfade with stable dimensions |
| Nav, form, CTA | 160–220 ms CSS state transitions |

**Fallbacks.** With reduced motion, phones, `?capture=1` or no JavaScript: no pin, no hidden entrances, and the pair is shown plainly. Everything is visible in the server HTML, and animation failure hides nothing. `?capture=1` is the static export state: posters, no sticky header, no scene, all content shown.

## 7. Frameworks, dependencies and skills

- **Dependencies added:** `gsap@3.15.0`, `@gsap/react@2.1.2` (npm, lockfile updated). QA tools stay `--no-save`.
- **Skills installed (local scope, this project):**
  - `frontend-design@claude-plugins-official` — read `skills/frontend-design/SKILL.md`.
  - `example-skills@anthropic-agent-skills` (marketplace `anthropics/skills`) — read `skills/frontend-design/SKILL.md` and `skills/webapp-testing/SKILL.md`. webapp-testing's helpers are Python; Python is not installed here, so its reconnaissance-then-action method was applied with Node Playwright (`scripts/qa/*.mjs`).
- **Skills already installed:**
  - `gsap-skills`: `gsap-react` and `gsap-scrolltrigger` were loaded; the `gsap-core` (matchMedia), `gsap-timeline` and `gsap-performance` SKILL.md files were read.
  - `ui-ux-pro-max` was installed but not used in this pass.
  - The user's `elite-design-director` skill governed delivery.
- **References:** the DJI Matrice 400, Sonos Arc Ultra and teenage engineering OP-1 pages were **not** browsed in this session, so no claim is made about them.

## 8. Verification (local production build, Chrome 155)

| Check | Result |
|---|---|
| `npm run lint` · `npm run typecheck` · `npm run build` | Pass (static prerender) |
| `scripts/qa/interaction.mjs` — 60 checks | **60 PASS**. Covers: hero autoplay and pause on real H.264; full-film viewer (modal, focus in, Escape, focus back, video removed); all films reachable (6 inline, 3 viewer); explorer click, keyboard and callouts; exact specifications; scene (0 → 1 → 2 by scroll, pinned, controls by click and keyboard, released afterwards); support media; form rules; menu; 44 px targets; phone system order; reduced motion; capture state; no-JS; axe-core WCAG 2.2 AA at 1440 and 390 (0 violations); no overflow at 1440/1280/1024/768/720/640/390/360. Results: `design-handoff/…/qa/interaction-results.json` |
| `scripts/qa/hero-contrast.mjs` (24 real loop frames, actual scrim, watermark counted conservatively, 1440/1280/1024) | All PASS. Lowest P95: intro 6.06:1 at 1024, headline 7.47:1, film controls ≥ 9.3:1 |
| `scripts/qa/copy-audit.mjs` against the contest copy PDF | 73 strings: 68 verbatim, 5 announcement labels, **0 unverified**. 7/7 applications, 5/5 specifications |
| First view (`scripts/qa/weight.mjs`, 20 Mbps, reduced motion) | 438 KB at 1440 and 336 KB at 390. GSAP adds ≈ 48 KB of script. Films load only on request; the hero loop only while playing |
| Exports (raster size read back) | 1440 × 8906, 1024 × 8394, 390 @2x 780 × 23766, hero + applications 780 × 7344. 25/25 images decoded, fonts loaded, 0 playing films |

## 9. Remaining blockers and client inputs

1. **Contest rules.** A genuine Figma view link and the entrant's own-voice walkthrough are separate deliverables. This prototype is not an entry.
2. The destination for `How authorisation works`, real pages for Solutions and About Us, a form handler and privacy notice, and captions or transcripts for films with speech (WCAG 1.2.2). All are carried over from refinement 2.
3. The **Vercel** deployment of this branch could not be checked from here (no Vercel tool authorised in this session). See `05_GITHUB_VERCEL_HANDOFF.md`.
