# 06 · Figma build specification

> **Superseded in part (13 October 2026).** Use the current exports in `exports/` and the tokens and type scale in `docs/ASSET_CLEANING_REFINEMENT_2.md` §4. A Figma connector is now attached to the Claude session; no Figma file has been created yet. Because the contest currently prohibits AI-generated layouts, any Figma file made from this Claude-assisted prototype is for internal handover only.


**Status: BLOCKED_EXTERNAL.** This environment has no Figma access, so no Figma file was created and no Figma link exists. The contest makes a view-accessible Figma link mandatory; the entrant must build it. This spec makes that a precise, fast job and keeps the file identical to the coded design and the exports.

## 1. Two build routes

**Route A — import, then organise (fastest).**
1. Deploy or run the preview (see `05_GITHUB_VERCEL_HANDOFF.md`). The URL must be publicly reachable for import tools.
2. In Figma, use a URL-to-Figma import plugin (for example *html.to.design* from the Figma Community — check its current pricing and terms) to import the page at **1440 × auto** and at **390 × auto**. Before capturing, set the browser to *prefers-reduced-motion* (or pause the films) so posters, not mid-frame video, are imported.
3. Rebuild the result into the structure below: rename layers, convert repeated parts into components, apply the styles. Imported layers are rarely contest-ready without this pass — judges look at layer organisation.

**Route B — rebuild by hand.** Place `exports/asset-cleaning-1440-full.png` and `exports/asset-cleaning-390@2x-full.png` as locked, 30 %-opacity underlays and rebuild on the grids below. Slower, but produces the cleanest auto layout.

Either way: **Share → Anyone with the link → can view**, then test the link in a private browser window before submitting.

## 2. File structure

```
TBE — Asset Cleaning (ABZ C10) — Contest entry
├─ 00 Cover            (title, date, designer, links to preview + repo)
├─ 01 Foundations      (colour, type, grid, icons, logo usage)
├─ 02 Components       (all components with variants)
├─ 03 Desktop 1440     (frame: "Asset Cleaning — Desktop — 1440")
├─ 04 Mobile 390       (frames: "Asset Cleaning — Mobile — 390 — Full",
│                               "Asset Cleaning — Mobile — 390 — Menu open",
│                               "Asset Cleaning — Mobile — 390 — Form errors")
└─ 05 Notes            (copy sources, pending items, WordPress map)
```

Inside each page frame, one top-level group per section, named in order:
`Header` · `01 Hero` · `02 Applications` · `03 The system` · `03.1 Specifications` · `04 Full service support` · `05 Operating legally` · `06 Enquiry` · `Footer`.

## 3. Grids

| Frame | Columns | Margin | Gutter |
|---|---|---|---|
| Desktop 1440 | 12 | 64 | 24 |
| Mobile 390 | 4 | 20 | 16 |

Baseline/row grid: 8 px.

## 4. Colour styles (`Colour/…`)

| Style | Hex | Style | Hex |
|---|---|---|---|
| `Colour/Ink` | #1D1D1B | `Colour/Signal` | #008DD2 |
| `Colour/Paper` | #FFFFFF | `Colour/Signal deep` | #006A9E |
| `Colour/Concrete` | #F2F2EE | `Colour/Signal bright` | #00A6DF |
| `Colour/Line` | #D6D6D0 | `Colour/Graphite` | #5C5C57 |
| `Colour/Fog` | #A9A9A2 | `Colour/Danger` | #B42318 |

Add a description to each style citing its source (see `02_CREATIVE_DESIGN_BLUEPRINT.md` §4.1).

## 5. Text styles (`Desktop/…` and `Mobile/…`)

Font: **Archivo** (Google Fonts, variable). Width axis values in parentheses; if the Figma build lacks the width axis, use Archivo Expanded for 108–112 % and Archivo SemiCondensed for 92–94 %.

| Style | Desktop | Mobile | Weight | Width | Line height | Letter spacing |
|---|---|---|---|---|---|---|
| Display | 109 | 42 | 560 (SemiBold) | 112 | 92 % | −3.2 % |
| H2 | 65 | 32 | 560 | 110 | 98 % | −2.8 % |
| Service row | 40 | 26 | 600 | 108 | 104 % | −2.6 % |
| Statement | 46 | 26 | 600 | 108 | 105 % | −2.5 % |
| Triad | 40 | 24 | 600 | 110 | 102 % | −2.5 % |
| Figure | 53 | 32 | 560, tabular | 110 | 100 % | −3 % |
| H3 | 28 | 21 | 600 | 104 | 115 % | −1.2 % |
| H4 | 18 | 18 | 620 | 102 | 130 % | −0.5 % |
| Lede | 21 | 17 | 400 | 100 | 150 % | 0 |
| Body | 16 | 16 | 400 | 100 | 162 % | 0 |
| Spec value | 17 | 17 | 600, tabular | 100 | 138 % | −0.3 % |
| Meta | 13 | 13 | 500, tabular | 94 | 135 % | 1 % |
| Label | 12 | 12 | 600, UPPERCASE | 92 | 120 % | 14 % |

## 6. Components (with variants)

| Component | Variant properties |
|---|---|
| `Button` | Type = Primary / Primary inverse / Ghost · Size = Default / Compact · State = Default / Hover / Focus |
| `Section head` | Tone = Light / Ink · Aside = On / Off |
| `Media control` | Kind = Play / Pause / Sound on / Sound off · Tone = Light / Ink |
| `Hero background` | State = Playing (pause icon) / Paused (play icon) — full-bleed image fill + ink scrim gradient; text layer above |
| `Application tile` | (image swap) · Index 01–04 |
| `Film card` | Kind = Watch (poster + play) / Ambient (frame + control bar) |
| `Spec row` | Mark = None / * / ** |
| `Spec group` | State = Open / Collapsed (mobile) |
| `Service row` | Note = On / Off · State = Default / Hover |
| `Form field` | Type = Text / Select / Textarea · State = Default / Focus / Error |
| `Nav item` | State = Default / Current |
| `Logo` | Lockup = Header (ink) / Footer (white + tagline) |

Use auto layout for rows, buttons and form fields so the walkthrough can show them resizing.

## 7. Images and logo

- Use the files in `public/media/img`, `public/media/poster` and `public/media/brand` (SVG logo — paste as vector).
- Keep tiles at 4:5 and do not crop through burned-in titles or watermarks.
- Hero: fill the frame with `public/media/poster/hero-c10-use-cases.jpg` (first frame of the background loop), add the ink scrim as gradient layers (values in `src/app/globals.css`, `.hero-scrim`), and place the 44 px pause toggle bottom-right (top-right on mobile). Note on the frame that the fill is a silent looping film.

## 8. Annotations for judges (05 Notes page)

- Copy source table (from `01_CLIENT_BRIEF_ANALYSIS.md` §6).
- Pending items: UK regulatory wording, service descriptions, form field set and privacy text.
- Source contradictions C-1 to C-6.
- WordPress block map (02 §9).
