# 02 · Creative design blueprint — "Field Manual"

> **Superseded (14 October 2026).** The current direction is the product presentation in `docs/ASSET_CLEANING_REFINEMENT_3.md`: product explorer, cleaning-system scene and three decoration layers. The WordPress mapping in §9 still applies; the explorer is a gallery block with three images, and the scene is one small script progressively enhancing a static pair.
>
> **Superseded (13 October 2026).** The page now follows the refined industrial editorial direction in `docs/ASSET_CLEANING_REFINEMENT_2.md` (Manrope only, cyan/graphite interface tokens, three decoration motifs). The WordPress mapping in §9 still applies section by section.


## 1. Experience thesis

> For cleaning contractors and facilities managers deciding whether a drone can replace scaffolding and rope access, the page should feel **engineered, evidenced and calm** — an indexed technical document whose expressive moments are real footage of the C10 at work — leading to a confident "Book a demonstration".

Core tension: *novel technology* vs *established engineering credibility*. The design resolves it by letting the footage carry the novelty while every word, number and rule behaves like a datasheet.

## 2. Three territories considered

| | A · Precision Instrument | B · Documentary Immersion | **C · Field Manual (chosen)** |
|---|---|---|---|
| Proposition | A cockpit/HUD interface: dark UI, telemetry overlays, radar sweeps | Full-bleed, scroll-driven film storytelling, minimal text | An indexed technical manual: numbered sections, hairline rules, tabular data, documentary plates of real footage |
| Layout DNA | Dense modular dashboard | Pinned full-screen scenes | 12-column editorial grid; alternating ink and paper bands |
| Type | Monospace + condensed sans | Large display serif | One family (Archivo) using its width axis |
| Imagery | Synthetic overlays on footage | Footage only, edge to edge | Real footage: full-bleed behind the hero text, framed plates elsewhere; studio render as specimen |
| Risk | Tech clichés the brief forbids; invented "telemetry" would fabricate data | Weak spec legibility; heavy scroll-jacking; hard in WordPress | Could feel austere — mitigated by scale, real footage and a single signal colour |

Scores (1–5; weights from the house rubric):

| Criterion (weight) | A | B | C |
|---|---|---|---|
| Fidelity to brief and brand (30%) | 2 — fails "no tech clichés" gate | 3 | **5** |
| Task clarity and conversion (25%) | 3 | 2 | **5** |
| Originality and craft (20%) | 4 | 4 | **4** |
| Accessibility and responsiveness (15%) | 3 | 2 | **5** |
| Feasibility in WordPress, performance (10%) | 3 | 2 | **5** |
| **Weighted** | 2.9 (gate fail) | 2.65 | **4.8** |

Decisions that make C distinctive rather than plain:

1. **Indexed architecture.** Every section opens with the same hairline rule and index (`01 Asset cleaning … 06 Enquiry`), echoed in the header, drawer and footer — the page reads like a manual, and the mandated order becomes the visual system.
2. **The film is the hero's ground, not a widget.** A 25 s silent loop cut from the named film runs full-bleed behind the headline. Its title cards, end card and the shots used as Applications tiles are left out, so the words and the footage never compete; one icon button pauses it.
3. **Legibility is engineered, not hoped for.** An ink scrim darkens only where text sits (left and bottom on desktop, bottom on phones) and was tuned against 22 frames of the loop: every text line stays at or above 6:1.
4. **Datasheet-grade specification.** The spec panel reproduces The Bionic Eye's datasheet verbatim in tabular figures, with the source PDF one click away.
5. **Ink/paper banding.** Expressive, footage-led bands (ink) alternate with reading bands (paper/concrete), giving the strong media/information contrast the brief asks for.

## 3. Motif and why it belongs to this client

- **Index + hairline**: 1 px ink rule, label in caps with 0.14 em tracking, index number in the signal blue. Used on all six sections, header label, drawer, footer and spec groups.
- **Signal square**: a 6–8 px square in signal blue marks bullet points, the hero kicker and section indices — derived from the square-edged geometry of datasheet tables, never decorative.
- **Square corners everywhere** (radius 0): engineered rather than consumer-friendly.
- **Field plates**: footage and photography always appear as plain rectangles with controls *below* the frame, so burned-in titles and partner watermarks stay intact.

## 4. Design tokens

### 4.1 Colour

| Token | Hex | Role | Source |
|---|---|---|---|
| `ink` | `#1D1D1B` | Text, ink bands, primary button | Logo artwork (`BionicEyeLogoLargeBlack2.ai`) |
| `paper` | `#FFFFFF` | Base surface | Logo (white version) |
| `signal` | `#008DD2` | Focus rings, signal squares | The Bionic Eye title card in `C10_Introduction_short.mp4` (sampled) |
| `signal-deep` | `#006A9E` | Signal used as text/hover on light surfaces | Proposed accessible shade of `signal` |
| `signal-bright` | `#00A6DF` | Signal on ink | Same title card, lighter field (sampled) |
| `concrete` | `#F2F2EE` | Alternate reading band | Proposed neutral |
| `line` | `#D6D6D0` | Hairlines and table rules | Proposed neutral |
| `graphite` | `#5C5C57` | Secondary text | Proposed neutral |
| `fog` | `#A9A9A2` | Secondary text on ink | Proposed neutral |
| `danger` | `#B42318` | Form errors only | Proposed functional colour |

Measured WCAG 2.x contrast (computed from the hex values):

| Pair | Ratio | Pair | Ratio |
|---|---|---|---|
| ink on paper | 16.88:1 | paper on ink | 16.88:1 |
| ink on concrete | 15.04:1 | paper 85 % on ink | 12.43:1 |
| graphite on paper | 6.72:1 | fog on ink | 7.14:1 |
| graphite on concrete | 5.99:1 | signal-bright on ink | 6.05:1 |
| signal-deep on paper | 5.91:1 | paper on signal-deep (hover) | 5.91:1 |
| signal-deep on concrete | 5.26:1 | danger on paper | 6.57:1 |
| signal (focus ring, non-text) on paper | 3.66:1 | input border on paper (non-text) | 3.43:1 |

No gradients except a functional 55 % ink scrim under poster play buttons.

### 4.2 Typography — Archivo (variable: weight + width), SIL Open Font Licence

Chosen because it is the typeface of The Bionic Eye's own "Specifications of C10" datasheet. The brochure's Montserrat belongs to ABZ's catalogue; the live website's Titillium Web is not in the asset pack.

| Style | Desktop 1440 | Mobile 390 | Weight / width | Line height | Tracking |
|---|---|---|---|---|---|
| Display (H1) | 109 px | 42 px | 560 / 112 % | 0.92 | −0.032 em |
| H2 | 65 px | 32 px | 560 / 110 % | 0.98 | −0.028 em |
| Service row | 40 px | 26 px | 600 / 108 % | 1.04 | −0.026 em |
| Legal statement | 46 px | 26 px | 600 / 108 % | 1.05 | −0.025 em |
| Triad | 40 px | 24 px | 600 / 110 % | 1.02 | −0.025 em |
| Figure | 53 px | 32 px | 560 / 110 %, tabular | 1.0 | −0.03 em |
| H3 | 27.6 px | 21 px | 600 / 104 % | 1.15 | −0.012 em |
| H4 | 18 px | 18 px | 620 / 102 % | 1.3 | −0.005 em |
| Lede | 21 px | 17 px | 400 / 100 % | 1.5 | 0 |
| Body | 16 px | 16 px | 400 / 100 % | 1.62 | 0 |
| Spec value | 17 px | 17 px | 600, tabular | 1.38 | −0.003 em |
| Meta | 13 px | 13 px | 500 / 94 %, tabular | 1.35 | 0.01 em |
| Label (caps) | 12 px | 12 px | 600 / 92 % | 1.2 | 0.14 em |

All sizes are fluid `clamp()` values in `src/app/globals.css`; the table shows the computed values at the two contest widths.

### 4.3 Space and grid

| Breakpoint | Columns | Margin | Gutter |
|---|---|---|---|
| < 768 px | 4 | 20 px | 16 px |
| 768–1023 px | 8 | 4.45 vw (34 px at 768) | 20 px |
| ≥ 1024 px | 12 | 4.45 vw, max 64 px (64 px at 1440) | 24 px |

Content max width 1440 px. Section padding `clamp(72px, 8.5vw, 136px)` (122 px at 1440, 72 px on phones). Header 88 px desktop / 68 px mobile.

### 4.4 Shape, icons, imagery

- Radius 0 throughout; 1 px hairlines; 1.5 px control borders; 3 px focus outline with 3 px offset.
- Icons: 14 custom 20 px icons, 1.5 px stroke, square caps (`src/components/icons.tsx`).
- Imagery: footage and photos never cropped through on-screen titles or watermarks; tiles 4:5; plates 16:9 / 16:10 / 3:2 / 4:3; product render on white as a specimen.

## 5. Anti-generic checks applied

No gradient blobs, glassmorphism, stock imagery, icon-card grids, testimonial carousels, invented stats, trust badges or AI art. The only gradient is the functional ink scrim behind the hero text. The only numbers on the page are verbatim datasheet values and film durations.

## 6. Page and component specification

### Component library

| Component | States | Notes |
|---|---|---|
| Button / primary | default · hover (signal-deep) · active · focus | 52 px tall (44 px compact) |
| Button / ghost | default · hover · focus | Datasheet download, form reset |
| Section head | light · on ink | Rule + index + label (+ optional aside) |
| Hero background | playing · paused · reduced-motion poster | Full-bleed film, decorative (`aria-hidden`); ink scrim; one 44 px icon toggle |
| Ambient video | playing · paused | Muted, loops, visible pause (WCAG 2.2.2), optional sound |
| Watch video | poster · playing (native controls) | Nothing downloads until clicked; excerpt labelling |
| Application tile | default | 4:5 image, index, title |
| Spec group | open · collapsed (mobile only) | Desktop always open; tabular `dl` |
| Service row | default · hover · focus | Pre-selects the form's "Interested in" |
| Form field | default · hover · focus · invalid (+ message) | Error summary with links, focus moved to summary |
| Header nav | default · current (scroll-spy) | Collapses to an accessible drawer below 1280 px |

### Section by section

| # | Objective | Composition (1440) | Mobile (390) | REQs |
|---|---|---|---|---|
| Header | Brand + way-finding + primary CTA | Stacked lockup · page label · 5 anchors · phone · CTA | Lockup · Menu → full-screen drawer (focus trap, Esc) | 011, 013 |
| 01 Hero | State the offer; show the C10 working | Full-bleed background film (fills the first screen, max 960 px) under an ink scrim; index rule at the top; kicker, H1, intro and CTA bottom-left (cols 1–8); pause toggle bottom-right; triad strip below | Film fills the first screen with a right-biased crop that keeps the C10 in view; text at the bottom; full-width CTA; toggle top-right; stacked triad | 012–014 |
| 02 Applications | What it cleans, at a glance | H2 + lede; 4 × 4:5 tiles; 8-col montage + 4-col portrait footage; versatility notes | 2 × 2 tiles; stacked footage | 015, 021–023 |
| 03 The system | How it works; full specification | Ink band: H2 + lede; film (7 col) + radar copy (5 col); RTK + washing beside field photo; 3-step workflow. Paper panel: specimen render, 4 headline figures, group index, two-column datasheet, footnotes, PDF download | Single column; later spec groups collapsed behind labelled toggles | 016, 027 |
| 04 Full service support | Five services, evidenced | Indexed service rows (7 col) + UK demo photo (5 col); three film cards | Stacked rows; photo; film cards | 017 |
| 05 Operating legally | Concise, sourced note | Remote ID statement with signal rule and citation; cross-link to OA support; "Copy pending" flag | Stacked | 018 |
| 06 Enquiry | Convert | Ink band: H2, contact links, field footage (6 col); white form card (5 col, sticky) | Stacked; form card full width | 019 |
| Footer | Sign-off | Tagline lockup · contacts + CTA · section index; preview disclaimer; back to top | Stacked | 020 |

## 7. Responsive behaviour

| Width | Behaviour verified |
|---|---|
| 1440 | Full 12-col composition (contest frame) |
| 1280+ | Inline header navigation |
| 1024 | Header → Menu drawer; spec panel two columns |
| 768 | 8-col; applications 2 × 2; support films 2-up |
| 390 / 360 | 4-col, 20 px margins; full-width CTA; hero film fills the first screen; spec groups collapsible; no horizontal overflow |

## 8. Motion storyboard

| Element | Trigger | Property | Timing | Reduced motion |
|---|---|---|---|---|
| Section content | Enters viewport | opacity 0→1, translateY 18→0 px | Scroll-linked (CSS `animation-timeline: view()`), entry 0–38 % (+6 % stagger) | None; content static |
| Hero background | ≥ 10 % visible | Muted loop; pauses off-screen | — | Never autoplays; poster + play toggle |
| Ambient footage | ≥ 35 % visible | Muted loop | — | Never autoplays |
| Nav underline | Scroll-spy | scaleX 0→1 | 300 ms precise ease | Instant |
| Buttons / arrows | Hover | colour; arrow translateX 3 px | 160–220 ms | Colour only |

No scroll-jacking, no parallax, no pinned sections. The reveal is pure CSS — browsers without scroll timelines show content immediately.

## 9. WordPress implementation map

| Preview piece | WordPress build |
|---|---|
| Tokens (`globals.css @theme`) | `theme.json` → `settings.color.palette`, `typography.fontFamilies` (Archivo self-hosted, OFL), `fontSizes` with fluid clamp, `spacing.spacingSizes`, layout `contentSize`/`wideSize` 1440 |
| Section head, buttons, rules | Block styles + block patterns (`tbe/section-head`) |
| Hero | Core **Cover** block with a background video (muted, loop, playsinline, poster) and the scrim as its gradient overlay; Heading, Paragraph and Buttons inside; ~1 KB vanilla script for the pause toggle and off-screen pause |
| Applications | Query-free pattern or ACF repeater: Image, Heading |
| Spec panel | ACF repeater (group → rows: label, value, footnote mark) or a styled core Table block; PDF via File block |
| Services | ACF repeater (title, optional note) rendering links to `#enquiry`; a few lines of script pre-select "Interested in" from the row's `data-service` |
| Ambient / watch videos | Core Video block (self-hosted) or YouTube/Vimeo embeds with privacy-enhanced mode; poster images |
| Enquiry form | Gravity Forms / WPForms / Contact Form 7 with the approved field set, honeypot, consent checkbox, and routing to the client's inbox/CRM |
| Reveal animation | The same CSS (`animation-timeline: view()`) in the theme stylesheet — no plugin |
| Header drawer | Core Navigation block overlay, or the same ~2 KB focus-trap script |

Nothing in the design depends on React; all interactions are reproducible with core blocks plus two small vanilla scripts.

## 10. Accessibility and performance rules

- Landmarks: header, main (skip link target), nav ×2, footer; one H1; sections labelled by their headings.
- Keyboard: every control reachable; visible 3 px focus ring; drawer traps focus and returns it on Esc.
- Media: no autoplay with sound; visible pause on every moving video; reduced-motion honoured; descriptive `aria-label`s; excerpts labelled.
- Forms: visible labels, required marked in text, inline errors linked from a focused summary.
- Measured: axe-core WCAG 2.2 AA — 0 violations at 1440 and 390.
- Performance (measured, local production build, 20 Mbps throttle): first view ≈ 0.9 MB (no video), LCP ≈ 0.6 s locally; hero loop 8.0 MB at 1080p / 2.9 MB at 540p on phones, loaded once then looped from cache; all other films load on demand.
- Hero text over moving footage (custom probe, 22 frames, P95 of the background under each text line): worst case 6.22:1 for the desktop headline (3:1 needed); small text ≥ 6.61:1 (4.5:1 needed).

## 11. Asset inventory

See `01_CLIENT_BRIEF_ANALYSIS.md` §2 and §5. Every on-page asset is a derivative of a supplied file; nothing is stock, generated or invented.
