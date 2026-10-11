# 01 · Client brief analysis — The Bionic Eye · Asset Cleaning (ABZ C10)

Prepared 11 October 2026. Inspection was done directly from the files listed in §2 (video frames, PDF text layers, image pixels and the logo vector data). Nothing here relies on assumed content.

## 1. Project snapshot

| | |
|---|---|
| Client | The Bionic Eye Ltd — UK and Ireland dealer for ABZ Innovation (brief §1) |
| Product | ABZ Innovation C10 cleaning drone |
| Audience | Professional cleaning contractors and facilities-management buyers |
| Deliverable type | **Design contest entry** for one page (Asset Cleaning), part of a later Phase 1 (10 templates) → Phase 2 (~27-page WordPress site) |
| Mandatory contest items | 1440 px full-page design (PNG/PDF) · 390 px mobile (hero + ≥1 section) · **view-accessible Figma link** · **2–3 min walkthrough in the entrant's own voice** · design note ≤100 words |
| Supporting delivery (standing instruction) | Responsive coded preview (Next.js) · GitHub push to `lonadonia/The-Bionic-Eye` · Vercel preview |
| Posture | Established, engineered, precise, corporate, contemporary. Not gimmicky, not a SaaS template |

## 2. Verified source inventory

All files are in the asset-pack folder `contests/7/`. "Used" means placed on the page; every placement is listed in §5.

### 2.1 Documents

| File | What it is | Inspection | Use |
|---|---|---|---|
| `C10 Brochure.pdf` (14 pp.) | ABZ Innovation "PRODUCT CATALOG 2026 · C10 CLEANING DRONE"; text layer in Montserrat | Full text layer extracted per page; pages viewed | Main **copy source** (pp. 2–7, 9–11, 14) |
| `C10_Datasheet.pdf` (3 pp.) | The Bionic Eye "Specifications of C10", EU and US columns; set in **Archivo** | Full text layer extracted; pages viewed | **Specification panel** (EU column, verbatim) and downloadable file |
| `README.md` | UTF-16 text: `# Bespoke` | Read | No copy — confirms that **no separate page copy deck was supplied** |

### 2.2 Brand assets

| File | Finding | Use |
|---|---|---|
| `BionicEyeLogoLargeBlack2.ai` | PDF-compatible Illustrator file; eye symbol + "THE **BIONIC** EYE" wordmark (outlined) + "UNMANNED & UNMATCHED" (Aileron Light); single fill `#1D1D1B` | Converted losslessly to SVG paths → header lockup (no tagline), favicon symbol |
| `BionicEyeLogoLargeWhite.ai` | Same artwork, white `#FFFFFF` | Footer lockup with tagline |

Reference only (not in the pack, accessed 11 Oct 2026): thebioniceye.co.uk uses the stacked symbol-over-wordmark lockup in its header — this page follows that precedent rather than inventing a new lockup. Its stylesheet uses Titillium Web and accent `#00BFF3`; neither is in the asset pack, so neither is used.

### 2.3 Video (8 files — all placed, see §5)

| File | Spec (probed) | Content (frame-by-frame review) |
|---|---|---|
| `C10-Use-Case-Shorts-Final-Horizontal.mp4` | 3840×2160 H.264 · 25 fps · 1:23 · stereo | ABZ film; title cards SOLAR PANEL CLEANING (00:06.8), FACADE CLEANING (00:24.2), ROOF MOSS REMOVAL (00:40.6), GUTTER CLEANING (00:59.6); ABZ end card |
| `C10 Short Low bitrate.mp4` | 1920×1080 · 0:55 · stereo | Montage: façades, glazing, metal cladding, rooftop solar arrays; ABZ watermark |
| `5f69a5e2-edb9-4dff-8bd8-14d3a8d570d0.MP4` | 1280×720 rotated → portrait 720×1280 · 0:39 | Phone footage looking up at the C10 washing tall white composite cladding, blue hose to ground |
| `C10_Introduction_short.mp4` | 1920×1080 · 2:23 · stereo | Opens and closes on The Bionic Eye title card (blue `#008DD2` field); annotated system features |
| `C10 Academy.mp4` | 1920×1080 · 5:04 · stereo | ABZ presenter-led film intercut with flight and cleaning footage |
| `ABZ Clean Station _ Full Setup & Operation Guide.mp4` | 3840×2160 AV1 · 5:49 · stereo | Step-by-step ground unit guide (visual inspection, power-up, PLC, tank filling, hose reel) |
| `TBE_Cleaning_Van-Compressed2.mp4` | 1920×1080 · 10:57 · stereo | The Bionic Eye van walkthrough: hose reel, pressure unit, water system |
| `IMG_2236.MOV` | 3840×2160 HEVC · 60 fps · 2:14 | C10 washing the green corrugated cladding of a large building, clear sky (UK field demo) |

### 2.4 Photography and renders

| File | Pixels | Content | Use |
|---|---|---|---|
| `C10 3.jpg` | 6000×3376 | C10 spraying stone-clad façade against deep blue sky | 02 tile "Façade cleaning" (4:5 crop) |
| `865A0018.jpg` | 2048×1378 | C10 beside rendered wall between tall windows | 03 The system, beside RTK / washing copy |
| `IMG_2240.JPG` | 5712×4284 | Two people watch the C10 spray a green steel building; red hose across gravel | 04 Full service support |
| `C10-2.png` | 8640×5760 | Studio side render, white background | 03.1 specification specimen |
| `IMG_2224.JPG` | 4032×3024 | C10 grounded on wet gravel | Reviewed — held in reserve |
| `Screenshot 2026-05-10 at 20.11.03.png` | 3414×1906 | Same scene and session as `IMG_2236.MOV` | Reviewed — the video version is used instead (avoids repeating the scene) |
| `C10.png`, `C10-5.png`, `C10-7.png` | 8640×5760 | Studio renders: folded front, three-quarter, nozzle close-up | Reviewed — reserved for product/shop templates |

## 3. What the client actually wants

- **Objective:** a contest-winning, technically credible Asset Cleaning page that sells demonstrations of the C10 to cleaning/FM professionals, and proves the designer can deliver Phase 1 templates that are buildable in WordPress.
- **Judging criteria (brief §8):** distinctiveness · fit for an established technical brand · typography and hierarchy · authentic photography and video · mobile design · WordPress feasibility · clarity of the walkthrough.
- **Primary action:** "Book a demonstration". **Secondary:** read the specification, contact by phone or email.
- **Hard limits:** verbatim copy only, British English, no invented data, mandated section order, named hero video.

## 4. Scope boundary

| In scope | Out of scope (deliberately not built) |
|---|---|
| One page: header, sections 1–6, footer — desktop and mobile | The other Phase 1 templates; the 27-page site |
| Coded responsive preview (design-evaluation aid, WordPress-feasible) | A WordPress theme build (mapped in 02 §9, not built) |
| PNG + PDF exports at 1440 and 390 | Live form submission, CRM, analytics |
| Figma build specification (06), walkthrough outline (07), design note (08) | **The Figma file itself and the voice recording** — need the human entrant (§8) |

> The coded preview is **not** a substitute for the Figma link or the walkthrough; the contest rules make both mandatory.

## 5. Asset-to-section map

| Section | Media placed | Treatment and rationale |
|---|---|---|
| Header | TBE lockup, ink (from `.ai`) | Stacked lockup as on the client's live site; restrained in-page navigation |
| **01 Hero** | **`C10-Use-Case-Shorts-Final-Horizontal.mp4`** (mandated) | Full-bleed **background film** behind the headline and text: a 25 s silent loop cut from the film on its own edits (8 shots, opening on the solar-panel clean), leaving out the on-screen title cards, the black end card and the shots used as Applications tiles so nothing competes with the headline. Ink legibility scrim (white text ≥ 6:1 at every sampled frame); muted autoplay only while visible, never under reduced motion; one icon-only pause/play control. 1080p 8.0 MB / 540p 2.9 MB via `<source media>`; poster = the loop's first frame |
| 02 Applications | 4 tiles: 3 stills from the hero film (16.5 s, 56.5 s, 70.5 s) + `C10 3.jpg` | Tile labels are the film's own title cards. The three stills come from shots that are **not** in the hero loop, so no footage repeats on the page |
| 02 Applications | `C10 Short Low bitrate.mp4` (ambient, muted, sound toggle) + portrait `5f69a5e2…MP4` | Broad montage of surfaces + vertical phone footage that shows reach up a wall — the strongest evidence for "hard-to-reach areas" |
| 03 The system | `C10_Introduction_short.mp4` (click-to-watch, with sound, full length) | The annotated product film belongs with the technology narrative; opens on The Bionic Eye's own title card |
| 03 The system | `865A0018.jpg`; `C10-2.png` render | Field photo beside RTK / washing copy; studio render as the datasheet specimen |
| 04 Full service support | `C10 Academy.mp4` (excerpt 0:00–1:00) · `ABZ Clean Station…mp4` (0:00–1:15) · `TBE_Cleaning_Van…mp4` (0:00–1:00) · `IMG_2240.JPG` | Training, servicing/setup and turnkey-van films sit with the services they evidence. Excerpts are labelled "Excerpt · mm:ss of mm:ss" — production should embed the full films |
| 06 Enquiry | `IMG_2236.MOV` (excerpt 0:04–0:28, muted loop) | Real UK demonstration footage beside the "Book a demonstration" form |
| Footer | TBE lockup + tagline, white | Brand sign-off |

Every one of the 8 supplied videos is placed exactly once; no video is invented and no absent file is claimed.

## 6. Approved copy deck (extracted, with verified sources)

Source of truth in code: `src/content/copy.ts` and `src/content/specs.ts`. The table below is generated from the automated copy-fidelity audit (`qa/copy-audit.json`), which matches every string against the PDFs' text layers.

<!-- Generated from qa/copy-audit.json on 2026-10-11T21:26:09.520Z. Do not edit by hand. -->

Audit totals: **BRIEF** 22 · **VERBATIM** 154 · **FILM TITLE** 4 · **UI / PLACEHOLDER** 4 — 0 unverified.

Status key: **VERBATIM** = found word-for-word in the cited PDF page text layer (after reversing the logged British-English localisations); **BRIEF** = wording given in the contest brief; **FILM TITLE** = on-screen title card in the hero film; **UI / PLACEHOLDER** = interface label or flagged placeholder (no product claim).

#### Global (header / footer / contact)

| Field | Approved text | Status | Source |
|---|---|---|---|
| `site.company` | The Bionic Eye Ltd | BRIEF | contest brief |
| `site.dealerLine` | UK and Ireland dealer for ABZ Innovation | BRIEF | contest brief |
| `site.pageName` | Asset cleaning | BRIEF | contest brief |
| `site.phone.display` | +44 1753 655886 | VERBATIM | BRO p.14 |
| `site.email.display` | info@thebioniceye.co.uk | VERBATIM | BRO p.11, BRO p.14 |
| `site.shop.display` | shop.thebioniceye.co.uk | VERBATIM | BRO p.14 |
| `site.contactHeading` | Find more about us | VERBATIM | BRO p.14 |

#### Primary call to action

| Field | Approved text | Status | Source |
|---|---|---|---|
| `cta.label` | Book a demonstration | BRIEF | contest brief |

#### Header navigation (in-page anchors)

| Field | Approved text | Status | Source |
|---|---|---|---|
| `nav[0].label` | Applications | BRIEF | contest brief |
| `nav[1].label` | The system | BRIEF | contest brief |
| `nav[2].label` | Full service support | BRIEF | contest brief |
| `nav[3].label` | Operating legally | BRIEF | contest brief |
| `nav[4].label` | Enquiry | BRIEF | contest brief |

#### 01 Hero

| Field | Approved text | Status | Source |
|---|---|---|---|
| `hero.kicker` | Meet the ABZ Innovation C10 | VERBATIM | BRO p.2 |
| `hero.heading[0]` | Clean smarter, | VERBATIM | BRO p.2 |
| `hero.heading[1]` | safer, higher | VERBATIM | BRO p.2 |
| `hero.intro` | The C10 is a purpose-built industrial cleaning drone engineered to carry high-pressure cleaning lances to elevated surfaces while keeping all heavy equipment—pumps, hoses, and water sources—securely on the ground. | VERBATIM | BRO p.3 |
| `hero.triad[0]` | No Scaffolding. | VERBATIM | BRO p.3, BRO p.10 |
| `hero.triad[1]` | No Height Risks. | VERBATIM | BRO p.3 |
| `hero.triad[2]` | No Compromise. | VERBATIM | BRO p.3 |

#### 02 Applications

| Field | Approved text | Status | Source |
|---|---|---|---|
| `applications.label` | Applications | BRIEF | contest brief |
| `applications.heading` | Access the Inaccessible | VERBATIM | BRO p.5 |
| `applications.lede` | Perfectly suitable for hard-to-reach areas where traditional machinery cannot fit. | VERBATIM | BRO p.5 |
| `applications.items[0].label` | Solar panel cleaning | FILM TITLE | hero film title card |
| `applications.items[1].label` | Façade cleaning | FILM TITLE | hero film title card |
| `applications.items[2].label` | Roof moss removal | FILM TITLE | hero film title card |
| `applications.items[3].label` | Gutter cleaning | FILM TITLE | hero film title card |
| `applications.versatility.lead` | Versatility | VERBATIM | BRO p.3, BRO p.4, BRO p.7 |
| `applications.versatility.points[0]` | Compatible with Osmosis (RO) water for streak-free glass cleaning and specialised nozzles for complex surfaces. | VERBATIM | BRO p.4 |
| `applications.versatility.points[1]` | The payload includes interchangeable nozzle holders (straight and tilting) to adapt to different architectural features. | VERBATIM | BRO p.7 |

#### 03 The system (narrative)

| Field | Approved text | Status | Source |
|---|---|---|---|
| `system.label` | The system | BRIEF | contest brief |
| `system.heading` | Engineered for precision | VERBATIM | BRO p.6 |
| `system.lede` | The C10 isn’t just a drone; it’s a precision instrument. The drone is equipped with advanced avionics designed specifically for stability near structures. | VERBATIM | BRO p.6 |
| `system.radar.title` | Automatic Radar-Controlled Distance System | VERBATIM | BRO p.6 |
| `system.radar.body` | Precision is key. The C10 features a front-mounted radar that measures the distance to the wall with an accuracy of 2–6 cm (≈ 0.8–2.4 in). | VERBATIM | BRO p.6 |
| `system.radar.points[0].lead` | How it works: | VERBATIM | BRO p.6 |
| `system.radar.points[0].text` | The pilot sets a “Desired Distance” (e.g., 1.5 metres (≈ 4.9 ft)). The drone automatically maintains this position relative to the surface, ensuring even cleaning. | VERBATIM | BRO p.6 |
| `system.radar.points[1].lead` | Emergency Push: | VERBATIM | BRO p.6 |
| `system.radar.points[1].text` | If the drone detects it is too close to the wall (e.g., due to a wind gust), the system automatically pushes the drone back to a safe distance (up to 2 metres (≈ 6.6 ft)) and switches to manual loiter mode for safety. | VERBATIM | BRO p.6 |
| `system.rtk.title` | RTK Positioning for Centimetre Precision | VERBATIM | BRO p.7 |
| `system.rtk.body` | For environments requiring maximum stability, the C10 supports Emlid RTK base stations and Network RTK (NTRIP). This allows the drone to use GNSS for altitude hold rather than barometers, preventing vertical drift in fluctuating pressure zones. | VERBATIM | BRO p.7 |
| `system.washing.title` | Optimised Washing System | VERBATIM | BRO p.7 |
| `system.washing.lead` | Capacity: | VERBATIM | BRO p.7 |
| `system.washing.text` | The system is engineered to handle the weight of the water-filled hose up to a working height of 60 metres (≈ 196.9 ft). | VERBATIM | BRO p.7 |
| `system.workflow.heading` | Workflow: A smarter way to work | VERBATIM | BRO p.10 |
| `system.workflow.intro` | Professional efficiency in three steps. | VERBATIM | BRO p.10 |
| `system.workflow.steps[0].title` | Setup | VERBATIM | BRO p.5, BRO p.10 |
| `system.workflow.steps[0].text` | The team positions the ground unit centrally. No heavy lifts, no scaffolding. | VERBATIM | BRO p.10 |
| `system.workflow.steps[1].title` | Launch | VERBATIM | BRO p.10 |
| `system.workflow.steps[1].text` | The pilot ascends to the target height while the helper manages the pressure unit. | VERBATIM | BRO p.10 |
| `system.workflow.steps[2].title` | Clean | VERBATIM | BRO p.1, BRO p.2, BRO p.3, BRO p.4, BRO p.5, BRO p.6, BRO p.9, BRO p.10, BRO p.11, DS p.1, DS p.2 |
| `system.workflow.steps[2].text` | The pilot engages the radar-based automatic distance control. The drone locks onto the façade, delivering a consistent, high-pressure wash while the operator monitors via HD FPV camera. | VERBATIM | BRO p.10 |

#### 04 Full service support

| Field | Approved text | Status | Source |
|---|---|---|---|
| `support.label` | Full service support | BRIEF | contest brief |
| `support.services[0].title` | Sales | BRIEF | contest brief |
| `support.services[0].note` | All prices are indicative, please ask for your custom tailored quote from our representative. | VERBATIM | BRO p.14 |
| `support.services[1].title` | Operational Authorisation support | BRIEF | contest brief |
| `support.services[2].title` | Training | BRIEF | contest brief |
| `support.services[3].title` | Servicing | BRIEF | contest brief |
| `support.services[4].title` | Enhanced warranty option | BRIEF | contest brief |

#### 05 Operating legally

| Field | Approved text | Status | Source |
|---|---|---|---|
| `legal.label` | Operating legally | BRIEF | contest brief |
| `legal.statement.lead` | Remote ID: | VERBATIM | BRO p.9 |
| `legal.statement.text` | Dronetag DRI module (EU/US compliant) | VERBATIM | BRO p.9 |
| `legal.statementSource` | ABZ Innovation C10 product catalogue, p. 9 | UI / PLACEHOLDER | designer UI label, flagged |
| `legal.crossRef.label` | Operational Authorisation support | BRIEF | contest brief |
| `legal.pending` | Approved regulatory wording to be supplied by The Bionic Eye before publication. | UI / PLACEHOLDER | designer UI label, flagged |

#### 06 Enquiry

| Field | Approved text | Status | Source |
|---|---|---|---|
| `enquiry.label` | Enquiry | BRIEF | contest brief |
| `enquiry.heading` | Ready to rethink high-altitude cleaning? | VERBATIM | BRO p.11 |
| `enquiry.contactLead` | Contact us: | VERBATIM | BRO p.11 |

#### 03.1 Specification panel (datasheet)

114 strings checked from `src/content/specs.ts`; non-verbatim: `specs.datasheet.label` (UI / PLACEHOLDER), `specs.datasheet.meta` (UI / PLACEHOLDER).

### 6.1 British-English localisation and typesetting log

| Source (US / caps) | On page | Where |
|---|---|---|
| meters (×4) | metres | 03 radar points, washing capacity |
| Centimeter | Centimetre | 03 RTK heading |
| Optimized | Optimised | 03 washing heading |
| specialized | specialised | 02 versatility |
| FACADE (film card) | Façade | 02 tile — brochure spelling "façade" (p. 3, p. 10) |
| CLEAN SMARTER, SAFER, HIGHER – MEET THE ABZ INNOVATION C10 | heading + kicker, sentence case | 01 hero |
| TECHNOLOGY: ENGINEERED FOR PRECISION | "Engineered for precision" | 03 heading — the "TECHNOLOGY:" kicker is replaced by the section label "The system" |
| `Payload:`, `Contact us:`, `Remote ID:` | colon dropped where set as a label | spec row, enquiry label, legal label (screen readers still hear "Remote ID:") |

Not changed: datasheet values are verbatim even where they look like typos ("LoRA", "25,5", "fix / tiltable", "44.4V") — see A-009.

## 7. Requirements traceability matrix

Status after implementation and testing. Evidence IDs refer to `04_QA_ACCEPTANCE_CHECKLIST.md`.

| ID | Class | Source | Requirement | Pri. | Implementation | Evidence | Status |
|---|---|---|---|---|---|---|---|
| REQ-001 | EXPLICIT | §1 | Asset Cleaning page for The Bionic Eye featuring the ABZ C10 | MUST | `src/app/page.tsx` | QA-SECTION-ORDER | VERIFIED |
| REQ-002 | EXPLICIT | §1, §5 | Established, engineered, precise, corporate, contemporary; not SaaS/gimmicky | MUST | "Field Manual" direction (02) | screens, exports | VERIFIED (design review) |
| REQ-003 | CONSTRAINT | §1 | Contest page only; WordPress-feasible | MUST | single route; 02 §9 WP mapping | 02 §9 | VERIFIED |
| REQ-004 | CONSTRAINT | §2 | Only exact client copy; no rewrite/paraphrase/invention | MUST | `src/content/copy.ts` | copy audit: 0 unverified | VERIFIED |
| REQ-005 | CONSTRAINT | §2 | No fabricated specs, claims, figures, certifications, testimonials, logos, photos, regulatory assurances | MUST | datasheet verbatim; no testimonials/badges | copy audit; §8 | VERIFIED |
| REQ-006 | CONSTRAINT | §2 | British English throughout | MUST | `lang="en-GB"`; §6.1 log | QA-LANG-EN-GB | VERIFIED |
| REQ-007 | EXPLICIT | §2, §7 | Inspect complete asset pack | MUST | §2 | this document | VERIFIED |
| REQ-008 | EXPLICIT | §2 | Flag absent copy/assets; no replacements | MUST | §8; on-page "Copy pending" flags | QA-COPY-PENDING | VERIFIED |
| REQ-009 | EXPLICIT | §2 | Authentic, sharp, purposeful photography; good crops | MUST | §2.4, §5 | exports | VERIFIED |
| REQ-010 | EXPLICIT | §3 | Header → 1–6 → footer in exact order | MUST | `page.tsx`, `layout.tsx` | QA-SECTION-ORDER | VERIFIED |
| REQ-011 | EXPLICIT | §3 | Header: supported brand assets, restrained nav, approved labels | MUST | `site-header.tsx`; labels = brief section names | screens | VERIFIED — global labels need client site map (A-002) |
| REQ-012 | EXPLICIT | §3.1 | Client-supplied headline and introduction | MUST | BRO p. 2–3 | copy audit | VERIFIED — no separate deck supplied (A-001) |
| REQ-013 | EXPLICIT | §3.1 | Prominent "Book a demonstration" | MUST | hero + header + footer + form | screens | VERIFIED |
| REQ-014 | EXPLICIT | §3.1, §4 | Named hero video as primary visual; readable, performant, integrated | MUST | `video/hero-background.tsx` | QA-HERO-*, hero contrast probe | VERIFIED |
| REQ-015 | EXPLICIT | §3.2 | Applications: what the C10 cleans; scannable; approved media | MUST | `applications.tsx` | screens, exports | VERIFIED |
| REQ-016 | EXPLICIT | §3.3 | Exact specs as a legible structured panel; nothing inferred | MUST | `system.tsx`, `specs.ts` | copy audit (114 spec strings) | VERIFIED |
| REQ-017 | EXPLICIT | §3.4 | Sales, OA support, training, servicing, enhanced warranty — provided wording only | MUST | `support.tsx` | copy audit | VERIFIED — descriptions not supplied (A-005) |
| REQ-018 | EXPLICIT | §3.5 | Concise regulatory note from approved copy; no implied approval | MUST | `legal.tsx` | copy audit | VERIFIED — UK wording pending (A-004) |
| REQ-019 | EXPLICIT | §3.6 | Short form + clear CTA; unspecified fields marked as placeholders | MUST | `enquiry-form.tsx` | QA-FORM-* | VERIFIED |
| REQ-020 | EXPLICIT | §3 | Footer with supplied information and assets only | MUST | `site-footer.tsx` | screens | VERIFIED |
| REQ-021 | EXPLICIT | §4 | Every other video reviewed and placed in context | MUST | §5 | §5 | VERIFIED (8/8) |
| REQ-022 | EXPLICIT | §4 | No repeated footage without rationale | MUST | §5 (hero loop excludes the tile shots) | §5 | VERIFIED |
| REQ-023 | EXPLICIT | §4 | Consistent video treatments, posters, accessible controls | MUST | `video/*` | QA-HERO-*, QA-WATCH-VIDEO, axe | VERIFIED |
| REQ-024 | EXPLICIT | §4 | No invented videos; no false claims of use | MUST | §5 | §5 | VERIFIED |
| REQ-025 | EXPLICIT | §5 | Editorial-industrial identity | MUST | 02 | exports | VERIFIED (design review) |
| REQ-026 | EXPLICIT | §5 | Contrast between expressive media and readable info areas | MUST | ink/paper banding | exports | VERIFIED |
| REQ-027 | EXPLICIT | §5 | Specs and support exceptionally clear | MUST | tabular spec rows, indexed services | screens | VERIFIED |
| REQ-028 | EXPLICIT | §5 | No stock patterns, gradients, excess cards, clichés, fake metrics, unsupported brand elements | MUST | 02 §5 | review | VERIFIED |
| REQ-029 | EXPLICIT | §5 | Colours/typefaces respect supplied branding; secondary choices explained | MUST | 02 §4, 08 | contrast table | VERIFIED |
| REQ-030 | EXPLICIT | §5 | Accessible contrast, visible focus, controls, mobile-first | MUST | tokens, focus rings | axe 0 violations; contrast table | VERIFIED |
| REQ-031 | EXPLICIT | §5 | Subtle interactions achievable in WordPress | MUST | CSS-only reveal; small vanilla-portable scripts | 02 §8–9 | VERIFIED |
| REQ-032 | EXPLICIT | §5 | One coherent system; header and footer in desktop composition | MUST | shared tokens | 1440 export | VERIFIED |
| REQ-033 | EXPLICIT | §6.1 | Desktop full page 1440, PNG or PDF | MUST | `exports/asset-cleaning-1440-full.{png,pdf}` | file | VERIFIED |
| REQ-034 | EXPLICIT | §6.2 | Mobile 390: hero + ≥1 section | MUST | `exports/asset-cleaning-390@2x-*.png`, `…390-hero-applications.pdf` | file | VERIFIED |
| REQ-035 | EXPLICIT | §6.3 | Real view-accessible Figma link, organised layers, styles/components | MUST | 06 build spec | — | **BLOCKED_EXTERNAL** (no Figma access in this environment) |
| REQ-036 | EXPLICIT | §6.4 | 2–3 min walkthrough in the entrant's own voice, in Figma | MUST | 07 outline | — | **BLOCKED — human task** |
| REQ-037 | EXPLICIT | §6.5 | Design note ≤100 words (type and colour) | MUST | 08 | word count | VERIFIED |
| REQ-038 | EXPLICIT | §7 | Asset map incl. all videos; missing prerequisites | MUST | §5, §8 | this document | VERIFIED |
| REQ-039 | EXPLICIT | §7 | Final review at 1440 and 390 | MUST | 04 | screens + exports | VERIFIED |
| REQ-040 | CONSTRAINT | user | Coded responsive preview, built and tested | MUST | Next.js app | build/lint/tsc/QA | VERIFIED |
| REQ-041 | CONSTRAINT | user | Push to `github.com/lonadonia/The-Bionic-Eye` | MUST | git | 05 | see 05 |
| REQ-042 | CONSTRAINT | user | Vercel-ready; preview if possible | MUST | Vercel Git project | 05 | see 05 |

## 8. Contradictions, assumptions and missing inputs

### 8.1 Source contradictions the client must resolve

| # | Topic | Datasheet (`C10_Datasheet.pdf`) | Brochure / film | Page treatment |
|---|---|---|---|---|
| C-1 | Max. take-off | 29 kg | MTOM 24.9 kg (BRO p. 8) | Datasheet value in the full table only; **not** promoted to headline figures |
| C-2 | Empty weight | 13 kg (without battery) | 11.75 kg (BRO p. 8) | Same as C-1 |
| C-3 | Unfolded dimensions | 2060 × 1600 × 600 mm (with spray lance) | 1460 × 1020 × 610 mm (BRO p. 9) | Datasheet row only (basis differs: with lance) |
| C-4 | Pressure | 170 bar working / 255 bar max (optional Kärcher HD 7/17 M PLUS) | "Up to 200 bar" (BRO pp. 4, 9); "180 bars" (Introduction film overlay) | Datasheet rows only; no pressure figure in page copy |
| C-5 | Flow | 11.6 l/min | 900 l/h ≈ 15 l/min (BRO pp. 4, 9); "15-litre-per-minute" (film) | Datasheet row only |
| C-6 | US conversion | 11.6 l/min shown as **30.6 gal/min** (≈ 3.06 is correct) | — | US column not shown on this UK page |

These are plausibly configuration differences (the datasheet lists an *optional* Kärcher unit; the brochure says "compatible with a variety of cleaning systems"), but only the client can confirm. The four headline figures (18 min, 10 m/s, ~3.5 km, min. 11 minutes) were chosen because no supplied source contradicts them.

### 8.2 Assumptions

| ID | Assumption | Confidence | Risk if wrong | Validation |
|---|---|---|---|---|
| A-001 | No page copy deck exists in the pack (`README.md` = "# Bespoke"); the brochure + datasheet are the approved copy | Medium | Different headline expected | Ask client; swap strings in `copy.ts` only |
| A-002 | No global navigation labels supplied → header uses the brief's own section names as in-page anchors | High | Header differs from future site map | Header component accepts the Phase 1 site map unchanged |
| A-003 | "UK and Ireland dealer for ABZ Innovation" (brief §1) is approved for display | Medium | Wording preference | Client confirmation |
| A-004 | The only approved regulatory copy is "Remote ID: Dronetag DRI module (EU/US compliant)" (BRO p. 9). It describes a module, not a UK approval; the page cites the source and shows a "Copy pending" flag for UK wording | High | — | Client supplies UK regulatory note |
| A-005 | Services are named in the brief without descriptions; none are invented. Each row links to the form and pre-selects the service. Sales carries the brochure's pricing note (p. 14) | High | Thin section until copy arrives | Client supplies service copy |
| A-006 | Form fields were not specified → proposed fields (Name*, Company, Email*, Phone, Interested in, Message) labelled "Proposed fields · pending approval"; privacy notice wording flagged as pending | High | — | Client approves field set, destination and privacy text |
| A-007 | Long films are served as labelled excerpts in the preview for performance; production embeds full films | High | — | Client chooses hosting (YouTube/Vimeo/self-hosted) |
| A-008 | ABZ watermarks/end cards in supplied films are acceptable (partner brand) | High | — | Client confirms rights to use ABZ films on its site |
| A-009 | Datasheet quirks kept verbatim: "LoRA" (usually LoRa), "25,5" (comma decimal), "fix / tiltable", "44.4V" (no space) | High | Looks like typos to buyers | Client corrects the datasheet; page updates from `specs.ts` |

### 8.3 Missing prerequisites (before production)

1. UK regulatory / Operational Authorisation wording for section 05.
2. Descriptions for OA support, training, servicing and the enhanced warranty option.
3. Approved enquiry field set, form destination (email/CRM) and privacy notice / consent text.
4. Global site map / navigation labels for Phase 1.
5. Footer legal details (registered company number, registered office, privacy policy link) — not in the pack, so not shown.
6. Resolution of contradictions C-1 to C-6.
7. **Figma file and recorded walkthrough** — must be produced by the human entrant (see 06, 07).

## 9. Recommendation

Proceed with the "Field Manual" direction (02): an indexed, datasheet-grade page whose expressive moments are the client's own footage, set in The Bionic Eye's datasheet typeface. It meets every mandatory constraint without inventing a word, and every section maps to standard WordPress blocks.
