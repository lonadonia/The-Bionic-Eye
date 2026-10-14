# Asset Cleaning — refinement 4: balanced Applications, films in place, brand ornaments

14 October 2026. This round follows the owner's feedback on the live page (refinement 3):

- Make the Applications section balanced, with no image outside the frame.
- Make its films play in place and remove their "Play film" labels.
- Remove the visible "Pause film" control from the hero.
- Add more decoration and brand-aligned shapes across the page.

Copy and section order are unchanged. Everything in `docs/ASSET_CLEANING_REFINEMENT_3.md` still applies except where noted here.

## 1. Applications

| Before (refinement 3) | Now |
|---|---|
| Featured facade photograph ran out to the left page edge | Every frame stays inside the 12-column frame (checked by `QA-APPS-IN-FRAME`) |
| Rows of unequal weight; corner marks protruding outside the text panel | 7/5 first row at one height (480 px at 1440); 6/6 second row where the cladding film and the text-led panel share a height; panel marks drawn inside its corners; a cyan lens marker before each text-led entry |
| Film strip: two landscape frames and a narrow portrait one, with labels over the pictures | 5/4/3-column strip at one height (269 px at 1440), with captions on two short lines |
| Films started only on "Play film" | All four films play in place: short silent loops, muted and inline, playing only while on screen and paused off screen |

### Loops (new derivatives, cut from the supplied films)

| Loop | Source and range | Size |
|---|---|---|
| `applications-c10-short-loop.mp4` | `C10 Short Low bitrate.mp4` 00:09–00:23: rooftop solar, glass curtain walling, metal cladding, solar array, stone facade | 960 × 540, 14 s, 1.8 MB |
| `applications-c10-introduction-loop-0155.mp4` | `C10_Introduction_short.mp4` 01:55.3–02:11.7: close flight and jets on stone, render and metal cladding. Cut to exclude the film's on-screen text and a shot showing third-party signage | 960 × 540, 16.4 s, 1.3 MB |
| `applications-cladding-portrait-loop.mp4` | `5f69a5e2-….MP4` 00:02–00:14 | 540 × 960, 12 s, 1.1 MB |
| Industrial cladding (unchanged file) | `IMG_2236.MOV` 00:04–00:28 (the clip already served) | 1280 × 720, 24 s, 3.1 MB |

Each poster is the loop's first frame. `scripts/qa/encode-media.sh` documents the commands.

### Behaviour (`AmbientFilm`)

- No words appear over the pictures.
- On hover or keyboard focus, two icon controls appear:
  - **pause/play**, so moving content can always be stopped (WCAG 2.2.2);
  - **watch with sound**, which opens the complete supplied film in the media viewer. Clicking the frame does the same.
- Touch screens cannot hover, so the small pause icon stays in view there.
- Loops never play with reduced motion, Save-Data or the static capture state (posters only).
- Every supplied film is still reachable.

## 2. Hero

The Play/Pause button is no longer visible, at the owner's request; only "Watch the full film" shows. To keep the moving background stoppable, the Play/Pause control stays in the tab order and appears (44 px) when it receives keyboard focus. It is also never started with reduced motion, Save-Data or in the capture state.

## 3. Brand ornaments (`src/components/decor.tsx`)

The shapes are drawn from the eye mark's vocabulary without redrawing the logo:

- **Lens rings (`IrisRings`):** concentric rings with four aperture arcs, after the eye's crescents.
- **Wing sweeps (`WingCurve`):** long S-curves, after the strokes either side of the eye.
- **Curved edges (`WaveEdge`):** the same sweep, with a cyan line, wherever the page passes into or out of a dark chapter.
- **Dot fields (`DotField`):** fine dot matrices.

They are all decorative (`aria-hidden`), use no figures or markers, sit behind content (z-index) and stay away from body copy.

| Where | Added |
|---|---|
| Header | A cyan thread along its lower edge, fading to the right |
| Every section intro | The cyan rule now ends in a small lens ring |
| Applications | Lens rings cropped at the right edge beside the heading; a dot field behind the film strip |
| Applications → The system, The system → Support, Proven in the field → Enquiry | Curved wave edges with a cyan line |
| The system | Large white lens rings behind the product stage on the cyan plane; a cyan wing sweep and a dot field introducing the Clean Station pair |
| Full service support | Lens rings on the soft grid plane; a dot field beside the van film |
| Operating legally | Lens rings under the heading (they fill the empty column); a faint wing sweep across the band |
| Proven in the field | A dot field under the heading; lens rings cropped at the bottom-right |
| Enquiry | Lens rings and a dot field around the cyan plane behind the form card |
| Footer | A faint wing sweep along its top edge |

## 4. Verification (local production build, Chrome 155)

| Check | Result |
|---|---|
| lint · typecheck · build | Pass |
| `scripts/qa/interaction.mjs` | **63/63 PASS**. New checks: `QA-APPS-FILMS-PLAY` (four loops playing, no labels over pictures), `QA-APPS-IN-FRAME`, `QA-APPS-FILM-PAUSE` (user pause, pause off screen). Updated: hero pause reachable by keyboard and hidden otherwise, films reachable (4 loops, 2 click-to-watch, 6 viewer buttons). axe-core WCAG 2.2 AA: 0 violations at 1440 and 390 |
| `scripts/qa/hero-contrast.mjs` | All PASS (lowest intro P95 6.06:1 at 1024). The hidden Play/Pause control is no longer measured |
| `scripts/qa/copy-audit.mjs` | 73 strings, 0 unverified |
| Exports | 1440 × 8989, 1024 × 8548, 390 @2x 780 × 24326, hero + Applications 780 × 7516. 25/25 images decoded, 0 films playing at capture. Comparison: `docs/refinement-4/before-after-1440.jpg` |

First-view transfer was not re-measured in this round. The loops load only when Applications comes into view (1–3 MB each).
