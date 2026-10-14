# Asset Cleaning — refinement 5: more polish in the hero and Applications

14 October 2026. Owner's request: more aesthetic quality across the design, especially in the hero and Applications. Copy, media and section order are unchanged; every addition is decorative (`aria-hidden`) and drawn from the brand's own shapes. Comparison: `docs/refinement-5/before-after-hero-applications-1440.jpg`.

## Hero

- **Curved wing edge** (`HeroWave`): the bottom of the film is cut by the same sweep as the eye mark's wings. A cyan line, with a fainter paired line, runs along it and draws itself once as the page opens (1.6 s, CSS only; static with reduced motion and in the capture state). It replaces the straight cyan edge rule.
- **Stacking fix, which made two existing details visible on desktop.** As a grid item of `.hero`, `.hero__grid` kept `z-index: 2`, which created a stacking context and lifted the film above the eye watermark and the fine frame boundary. Neither had actually been visible at desktop widths. With `z-index: auto` both now show:
  - the frame boundary, with framing marks at its corners;
  - the eye symbol, enlarged (68 vw, 8.5 %) behind the reading zone and fading out before the drone.
- **Section rule above the headline:** the cyan rule with its lens ring now also introduces the H1.
- **Depth on the copy:** a soft text shadow over the moving film on desktop.
- **Primary action:** a soft cyan glow, with a 1 px lift on hover.
- **"Watch the full film":** a cyan ring pulses twice around its play icon (under 5 s in total, so no pause control is needed for it).

## Applications

- A soft cyan atmosphere at two corners of the section.
- A measured line from the heading to the lens rings, ending in a lens ring.
- **Caption cards:** white cards with the lens marker overlap the lower edge of each picture, so all seven entries now share one marker.
- **Photographs:** fine viewfinder marks inside the corners of the two photographs.
- **Text-led panel:** a soft gradient, with faint lens rings in its lower corner.
- **Film band:** the three films sit on a dark cinematic panel (radial cyan light, cyan top accent, dot field), with captions in white.

## Verification

- lint · typecheck · build: pass.
- `interaction.mjs`: 63/63 PASS, with axe-core 0 violations at 1440 and 390.
- `hero-contrast.mjs`: all PASS. The now-visible watermark is counted conservatively as a flat 8.5 % white box over the text; the lowest P95 is 4.92:1, for intro paragraph 2 at 1024 (needs 4.5:1).
- `copy-audit.mjs`: 0 unverified.
- Exports refreshed (1440 × 9039, 1024 × 8609, 390 @2x 780 × 24328, hero + Applications 780 × 7510).
