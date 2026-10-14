# Asset Cleaning — refinement 6: a lighter hero

14 October 2026. Owner's request: make the hero text smaller, lighten the shade on the left a little, and remove the large transparent logo and the thin frame. Copy, media and section order are unchanged. Comparison at 1440 and 390: `docs/refinement-6/before-after-hero.jpg`.

## Changes

- **Smaller type.**
  - The headline (the page's only `.t-h1`) now runs from 32 px at 360 to 50 px at 1440 (was 36 → 58). On phones it sets in three lines instead of four.
  - The introduction sets at 16 px (was 17–18 px), with a 32 rem measure on desktop (was 35 rem).
- **Narrower reading zone:** 448 px at 1024 growing to 528 px at 1440 (was 480 → 600). The copy ends earlier, so more of the film shows.
- **Lighter shade on the left.**
  - The directional scrim starts at 80 % instead of 90 % and fades sooner.
  - Its stops follow the copy:
    - From 1280 px the copy ends near 44 % of the width, so the shade fades out by 70 %.
    - Below 1280 px the copy reaches up to 48 %, so the shade runs a little further, to 74 %.
  - The bottom shade under the controls is 45 % instead of 50 %.
- **Removed on every width:**
  - the large eye watermark, which on phones also sat at the lower right;
  - the fine frame boundary with its corner marks.
- **Kept:** the section rule above the headline, the CTA glow, the pulse ring on "Watch the full film", and the curved wing edge. The eye symbol remains in the Enquiry section.

## Verification

- lint · typecheck · build: pass.
- `interaction.mjs`: 63/63 PASS, with axe-core 0 violations at 1440 and 390.
- `hero-contrast.mjs`, now also run at 1920 (1920, 1440, 1280, 1024): all PASS.
  - The lowest P95 is 5.88:1, for intro paragraph 1 at 1280 (needs 4.5:1).
  - At 1024 the lowest is 6.02:1, against 4.92:1 before. Removing the watermark and the smaller copy more than offset the lighter shade.
- `copy-audit.mjs`: 0 unverified (73 strings: 68 verbatim, 5 announcements).
- Design note (`08_DESIGN_NOTE.md`): "58px" is now "50px"; 93 words (limit 100).
- Exports refreshed:
  - 1440 × 9039 and 1024 × 8566 full page;
  - 390 @2x full page, 780 × 24140;
  - hero + Applications, 780 × 7330;
  - PNG + PDF for the contest files;
  - first-viewport screens at six widths.
