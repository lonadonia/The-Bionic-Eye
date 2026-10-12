# Asset Cleaning — design refinement ("Precision in Motion")

Refinement pass on the existing coded preview (`src/`), 11–12 October 2026. It supersedes the typography, colour, layout and motion sections of `design-handoff/…/02_CREATIVE_DESIGN_BLUEPRINT.md` and the type styles in `06_FIGMA_BUILD_SPEC.md`; the design note (`08`) has been updated to match. Scope: the Asset Cleaning page and the components it shares (header, footer, video, form). Copy rules from `design-handoff/…/01_CLIENT_BRIEF_ANALYSIS.md` still apply: every product string is verbatim from the brochure, the datasheet or the brief. Only interface labels (button text, filter field, captions that name a source file) are new. They live in `src/content/ui.ts` and make no product claims.

## 1. Diagnosis of the previous build (baseline screenshots at 1440 and 390)

| # | Issue | Evidence |
|---|---|---|
| 1 | Hero H1 overpowers the footage | `.t-display` reached 112px at 1440, set 112% wide at weight 560. The two lines spanned 770px and sat on the drone's flight path. A dense 0.86 ink scrim then darkened the left 60% of the film to keep the text readable. |
| 2 | Typography reads as one register | One family (Archivo, widened) was used for display, labels, values and body. Tracked capitals for every eyebrow, every meta line and the dealer line made the page feel like template chrome, not an engineered document. |
| 3 | Abrupt chapter changes | The page ran ink → white strip (huge "No Scaffolding." text) → concrete → ink → white → concrete → white → ink. Each block ended flush with no bridge, so the order read as black/white/black stripes. |
| 4 | Applications was a row of identical tiles | Four 4:5 tiles of equal size (310px at 1440), numbered 01–04 although they are not a sequence, then two videos with heavy bordered control bars below. |
| 5 | Engineering story read as isolated rows | Radar, RTK and Washing were three text blocks beside two unrelated media (product film, wall photo), with no visual that showed each capability. |
| 6 | Specifications hard to scan | 48 rows in two columns at the same weight. Group "pills" looked like SaaS chips. Headline figures at 56px wrapped ("min. 11 / minutes") and competed with the table. There was no way to find a row quickly. |
| 7 | Support was a static list | Five 40px link rows (four with no description) and an unrelated photo, then three film cards. Nothing connected each service to its evidence. |
| 8 | Legal note shouted | A 48px statement with a heavy 3px rule and a dashed box read as a promotional banner, not a document note. |
| 9 | Form looked generic | The white card had 1.5px grey borders, square fields and no pending/submitting state. The success message was the only feedback beyond errors. |
| 10 | Motion was undifferentiated | Every block used the same scroll-scrubbed fade/translate, which also replayed in reverse on scroll-up. The hero had no entrance and the poster was a 234 KB unoptimised JPEG. |
| 11 | Header was heavy | An 88px white bar with a 58px logo cut a hard band off the top of the film on every screen. |

## 2. Direction: Precision in Motion

For cleaning contractors and FM buyers deciding whether a drone can replace scaffolding, the page should feel **engineered, calm and evidential**. Real C10 footage and datasheet values carry the persuasion, and typography and motion stay out of their way. Three references guide the principles without copying any layout:

- **DJI Matrice 400:** capability-by-capability storytelling with the product image anchored.
- **Sonos Arc Ultra:** controlled whitespace, product on a solid tonal stage.
- **Apple MacBook Pro:** paced chapters, one cinematic film moment, a scroll-anchored feature sequence.

None of the three sites was reachable from the build environment: the network policy returns 403. The principles above are applied from the brief's descriptions.

The boldness goes in one place: **the engineering chapter**. The C10 Introduction film sits there as a cinematic frame, followed by a sticky stage. As the visitor reads Radar → RTK → Washing system, the stage cross-fades between three frames from The Bionic Eye's own film that show each capability. Everything else is quiet.

## 3. Tokens

### Type
- **Manrope** (headings, figures, interface labels): a geometric grotesque with squared terminals, good at weights 500–650 and with tabular figures.
- **DM Sans** (body, captions, form): optical sizes, open apertures at 15–18px.
- Both are loaded through `next/font` (self-hosted, `display: swap`). The project had no established brand face: the datasheet is set in Archivo and thebioniceye.co.uk uses Titillium Web. So the brief's preferred pair is used.

| Role | Desktop | Mobile | Setting |
|---|---|---|---|
| Hero H1 | `clamp(2.375rem, 1.05rem + 3.55vw, 4.1rem)` → 66px at 1440 | 38px at 390 | Manrope 600, lh 1.04, −0.034em, two deliberate lines |
| Section H2 | → 50px | 30px | Manrope 600, lh 1.06, −0.03em, `text-wrap: balance` |
| Feature H3 | → 28px | 22px | Manrope 600, lh 1.16, −0.02em |
| Lede | 19px | 17px | DM Sans 400, lh 1.55 |
| Body | 16.5px | 16px | DM Sans 400, lh 1.65, max 68ch |
| Meta / labels | 13–14px | 13px | DM Sans 500, sentence case, tabular numerals |

There are no tracked all-caps labels. Section indices (01–06) stay because the chapters are a mandated sequence and match the navigation. Workflow steps 1–3 are numbered because they are a process. Applications and services are not numbered.

### Colour
| Token | Hex | Use |
|---|---|---|
| `ink` | `#111719` | Graphite: dark chapters, primary text (17.1:1 on paper) |
| `ink-raised` | `#1A2226` | Surfaces inside dark chapters |
| `paper` | `#F8F9F8` | Page light |
| `silver` | `#E7ECEE` | Technical silver: product stage, Applications chapter |
| `mist` | `#EEF1F2` | Support chapter |
| `slate` | `#56636A` | Secondary text (≥5.2:1 on all light surfaces) |
| `fog` | `#A3AFB4` | Secondary text on graphite (7.2:1) |
| `signal` | `#008DD2` | Brand blue, sampled from The Bionic Eye title card: accents, rules, focus |
| `signal-strong` | `#0079B6` | Primary button fill (white text 4.76:1) |
| `signal-ink` | `#006A9E` | Links and active text on light (≥4.9:1) |
| `signal-bright` | `#3DB8EA` | Accent text and focus on graphite (8:1) |

One accent (brand blue) carries every interaction: buttons, active nav, focus rings, tab indicators and technical highlights. There are no gradients except functional film scrims.

### Space, radii, rules
- Container 90rem with `clamp(1.25rem, 4.45vw, 4rem)` gutters, so 1312px of content at 1440. Grid: 4 / 8 / 12 columns.
- Chapter padding `clamp(5rem, 9vw, 9rem)`; block gap `clamp(3.5rem, 6vw, 6rem)`.
- Radii: 0 on media, panels and the stage (engineered edges). 2px on buttons, fields and chips.
- Rules: 1px hairlines; 2px only for spec-group heads. Corner markers (8px L-marks) are used only on the two technical frames: the capability stage and the product stage.
- Buttons: 52px (large) / 44px (compact). Fields: 48px.

## 4. Chapters and transitions

```
HERO (graphite + film) ── benefit rail closes the hero inside the film
APPLICATIONS (paper)   ── asymmetric 7/5 · 5/7 gallery, then field footage pair
THE SYSTEM (graphite)  ── cinematic film → sticky capability stage → workflow line
   ╲ product stage straddles the seam (silver panel, half on graphite, half on paper)
SPECIFICATIONS (paper) ── key figures strip → searchable grouped datasheet
SUPPORT (mist)         ── tabbed split panel (accordion on mobile) → TBE film
OPERATING LEGALLY (paper, document note with a measured rail)
ENQUIRY (graphite) + FOOTER (graphite, hairline join)
```

The two dark-to-light seams are designed rather than cut. The hero closes with a benefit rail inside the film. The product stage bridges The system into its datasheet, so the C10 "rises" out of the dark chapter.

## 5. Section notes

- **Header:** fixed, transparent over the film with a white logo (CSS filter on the ink SVG). After 8px of scroll it becomes paper with a hairline and shrinks: 80 → 68px on desktop, 72 → 64px on phones. The header is fixed, so nothing below shifts. An inline head script sets the initial state before first paint. Without JavaScript the header stays solid.
- **Hero:** the poster is a `next/image` with `preload` (AVIF, LCP). The film fades in only once it has started playing, so the poster always comes first, and pausing keeps the current frame. Text is bottom-left, with a scrim tied to the copy column so the drone stays clear on the right. On phones the film fills the top 58% and the copy sits on graphite below it, so the C10 is never covered and the CTA is still above the fold at 390×844. A two-action row ("Book a demonstration" plus "View specifications") is followed by the benefit rail (No Scaffolding / No Height Risks / No Compromise) and a film control with a live progress hairline. The entrance is CSS-only: a 700ms poster fade and settle, with text staggered 80ms apart and finished by ~900ms.
- **Applications:** a checkerboard of wide (8:7) and tall (4:5) crops from the existing stills, with focal points set per image. Masked reveals vary by position; hover scale is 1.03 on fine pointers only, with no link affordance because tiles are not links. Below: the montage film (8 cols) and the portrait cladding film (4 cols), each with a slim caption bar, then the Versatility points.
- **The system:** the C10 Introduction film runs full container width with a scroll-linked 0.94 → 1 settle (CSS view timeline). Then the capability sequence, at ≥1024px with a fine pointer and motion allowed. A sticky 3:2 stage on the left shows real evidence: the field photograph of the C10 holding its distance from a rendered wall (radar), then two frames from the same film: 01:41, the "Stability · Advanced radar · Dual RTK · Emlid RTK" overlay (RTK), and 02:02, the water-filled hose hanging under the drone (washing system). Film stills anchor left so the ABZ watermark is never cut. The stage cross-fades as each capability reaches the reading line, and a three-segment index jumps between them. Elsewhere it degrades to stacked image + text (side by side on large screens). Inactive steps recede by colour, not opacity, so they keep ≥7:1 contrast. The frames at 01:18–01:22 are excluded because their "180 bars" / "30–40 meter" overlays contradict the datasheet (C-4, C-5).
- **Specifications:** the product render sits on a silver stage (multiply blend) that straddles the seam. Three numbered pins mark parts that are unambiguous in the render, and a legend quotes the matching datasheet rows (looked up from `specs.ts`, never retyped): Rotor dimensions 30 x 11, Spray lance Removable for transport, Spray nozzle 25°. Next comes a key-figure strip (the four uncontradicted values), whose units are set smaller but the strings are unchanged. Then a find-as-you-type filter (accent-insensitive, match highlighting, live result count, Escape to clear) over all 48 rows. Rows are laid out in two balanced columns of groups on desktop and as disclosure groups on mobile (General open by default; groups with matches open while filtering). Footnote marks link to the notes.
- **Support:** five services exactly as briefed. Desktop uses a vertical tab list beside a stable-height panel, with a 320ms cross-fade between stacked panels. Media is the real evidence where it exists: the field demonstration photo (Sales), C10 Academy (Training), the ABZ Clean Station guide (Servicing). Services without supplied copy or media show a graphite plate with The Bionic Eye symbol and a "Copy pending" flag, not invented text or a stand-in photo. Each panel's CTA pre-selects that service in the form. On mobile the same data becomes an accordion. The TBE Cleaning Van film closes the section.
- **Operating legally:** a document-style note. The verbatim Remote ID line at 28px, a source citation, a measured left rail, a cross-reference that opens the Operational Authorisation support tab, and the pending-wording flag as a footnote.
- **Enquiry:** heading and contact lines with the field-demonstration loop on the left; the form card (6 cols) on the right is primary. Form changes: 48px fields, 2px-radius focus ring, blur-time validation after first touch, an error summary, a pending ("Sending…") state behind an async submit seam that currently resolves locally, and a clearer success state. The fields, data and preview-only behaviour are unchanged. Consent wording remains a flagged gap: no legal text is invented.

## 6. Motion system

CSS plus one small observer. **No animation library is added.** The page is static, and the preview must stay portable to a WordPress theme (REQ-031). Every effect here is a compositor-only transform or opacity, which CSS transitions and scroll-driven animations already handle, so Motion for React would only add bundle weight.

| Primitive | Mechanism | Where | Timing |
|---|---|---|---|
| Entrance | CSS keyframes on load | Hero poster, copy, rail | 600–700ms, stagger 80ms, `cubic-bezier(.2,.7,.2,1)` |
| Reveal (one-shot) | `RevealObserver`: hides only elements still below the fold after hydration, reveals once at 12% visibility (masked elements are observed via their parent) | Headings, ledes, gallery, metrics | 560ms fade + 16px rise; `mask` / `mask-left` unclip images over 900ms, with gallery wipes varied by position |
| Scroll-linked | CSS `animation-timeline: view()` inside `@supports` | System film settle (0.94 → 1), workflow line draw, a ±4% drift on the product render | Scrubbed |
| State change | CSS transitions | Header, tabs, stage cross-fade, buttons | 160–320ms |

Guarantees:
- Content is visible if JavaScript or animation fails, because nothing is hidden in server HTML.
- `prefers-reduced-motion: reduce` disables reveals, scrubbing and the hero entrance, stops film autoplay (poster only) and stacks the capability sequence.
- No scroll listeners trigger React re-renders. The only per-frame work is the hero progress hairline, a rAF loop that runs only while the film is playing.

## 7. Verification (local production build, `next build` + `next start`)

| Check | Result |
|---|---|
| `npm run lint`, `npm run typecheck`, `npm run build` | Pass (static prerender) |
| Approved copy | `src/content/copy.ts` and `specs.ts` are byte-identical to `main`; new strings are interface labels in `ui.ts` |
| Horizontal overflow at 1440 / 1280 / 1024 / 768 / 390 / 360 | None (`scrollWidth == clientWidth` at all six) |
| `scripts/qa/interaction.mjs` (43 checks, Chromium 141, 1440 + 390 + reduced motion) | 41 pass, 0 fail, 2 SKIP: hero autoplay/pause, because this Chromium build cannot decode H.264. Run with Google Chrome to cover them. Results: `design-handoff/…/qa/interaction-results-refinement.json` |
| axe-core WCAG 2.2 AA, after full scroll | 0 violations at 1440 and at 390 |
| Hero text contrast over 22 frames of the loop (P95 of glyph boxes) | All pass at 1440 / 1024 / 768 / 390. Lowest: intro 6.0:1 (1024), film label 6.1:1, header phone 6.8:1, header nav 7.7:1 |
| Console errors / hydration warnings | None |
| Lighthouse 12.8 (mobile, simulated slow 4G) | Perf 97 · A11y 100 · BP 100 · SEO 63 (only `is-crawlable`, the deliberate `noindex` of a contest preview) · FCP 0.9 s · **LCP 2.4 s** · CLS 0 · TBT 100 ms |
| Lighthouse 12.8 (desktop) | Perf 100 · A11y 100 · BP 100 · SEO 63 · FCP 0.3 s · **LCP 0.7 s** · CLS 0 · TBT 0 ms |
| Same Lighthouse runs on the previous build (`main`) | Mobile Perf 80, LCP 5.5 s; desktop Perf 98, LCP 1.1 s |

The mobile LCP gain comes from two changes. The hero poster is now an AVIF `next/image` with high fetch priority, not a 234 KB JPEG `poster` attribute. The three below-the-fold ambient films no longer fetch 335 KB of eager JPEG posters, which competed with it.

Screenshots: `docs/refinement/` (before/after hero at 1440, hero at 390, capability stage, product stage, support panel).

### Known limits and open items
- **Film playback** was not verified in a browser here, because the environment's Chromium lacks H.264. Poster states, controls, focus and pause-when-hidden were verified.
- **Captions/transcripts** for the films with speech (C10 Introduction, C10 Academy, Clean Station guide, TBE Cleaning Van) were not supplied. WCAG 1.2.2 requires captions before production.
- Reference sites (DJI, Sonos, Apple) were blocked by the environment's network policy (HTTP 403), so their principles were applied from the brief's descriptions.
- Still pending from the client, as before: UK regulatory wording, descriptions for four services, form fields/destination/consent wording, and resolution of datasheet vs brochure contradictions C-1 to C-6.
- The contest exports in `design-handoff/…/exports/` still show the previous design. Regenerate them with `scripts/qa/export.mjs` once this direction is approved.
