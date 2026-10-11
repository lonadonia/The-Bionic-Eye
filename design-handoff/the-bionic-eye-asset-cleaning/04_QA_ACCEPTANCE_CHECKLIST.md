# 04 · QA and acceptance checklist

Run on 11 October 2026 against the local **production** build (`next build` + `next start`) in Chrome 154 (headless, driven by Playwright). Evidence files are in `qa/`. Statuses: `VERIFIED_PASS`, `FAILED`, `NOT_TESTED`, `BLOCKED_EXTERNAL`, `NOT_APPLICABLE`.

## 1. Build and code quality

| Check | Command | Result |
|---|---|---|
| Production build | `npm run build` | VERIFIED_PASS — exit 0; `/` prerendered static |
| Type check | `npx tsc --noEmit` | VERIFIED_PASS — exit 0 |
| Lint | `npx eslint .` (next core-web-vitals + typescript) | VERIFIED_PASS — exit 0, 0 problems |
| Console / page errors | Playwright listeners at 1440 and 390 | VERIFIED_PASS — none |

## 2. Contest acceptance checklist (brief)

| Item | Status | Evidence |
|---|---|---|
| Only client-approved copy and assets; British English | VERIFIED_PASS | `qa/copy-audit.json`: 154 verbatim (PDF text layer), 22 brief, 4 film titles, 4 UI/placeholder labels, **0 unverified**; localisation log in 01 §6.1; `lang="en-GB"` |
| Header, sections 1–6 in order, footer | VERIFIED_PASS | QA-SECTION-ORDER: `top > applications > the-system > full-service-support > operating-legally > enquiry`; header and footer in both exports |
| Named C10 video in hero | VERIFIED_PASS | QA-HERO-AUTOPLAY plays `hero-c10-use-cases-1080.mp4` (from `C10-Use-Case-Shorts-Final-Horizontal.mp4`) |
| All additional supplied videos thoughtfully placed | VERIFIED_PASS | 8/8 placed once each — 01 §5 |
| Full desktop design 1440 | VERIFIED_PASS | `exports/asset-cleaning-1440-full.png` (1440 × 11 675) and `.pdf` (single page) |
| Mobile 390: hero + another section | VERIFIED_PASS | `exports/asset-cleaning-390@2x-hero-applications.png` / `.pdf` (hero + Applications); full page `asset-cleaning-390@2x-full.png` |
| Exported PNG or PDF | VERIFIED_PASS | both provided |
| Real view-accessible Figma link | **BLOCKED_EXTERNAL** | No Figma access in this environment; build spec in 06 |
| Real 2–3 min recording in entrant's own voice | **BLOCKED_EXTERNAL** (human task) | Outline in 07 |
| Typeface/colour note ≤100 words | VERIFIED_PASS | 94 words — `qa/design-note-wordcount.txt` |
| WordPress-achievable | VERIFIED_PASS (by design review) | Block/ACF map, 02 §9; no React-only behaviour |

## 3. Functional journeys (automated, `qa/interaction-results.json`)

| ID | REQ | Scenario | Result |
|---|---|---|---|
| QA-HERO-AUTOPLAY | 014 | Hero film plays muted when visible (motion allowed) | PASS — `{"paused":false,"muted":true,"t":2.2}` |
| QA-HERO-PAUSE | 023 | Pause button pauses | PASS |
| QA-HERO-SOUND | 023 | Sound toggle unmutes | PASS |
| QA-HERO-CHAPTER | 014 | "Gutter cleaning" chapter seeks the film | PASS — t = 60.04 s |
| QA-APP-CHAPTER-LINK | 015 | Applications "In the film 00:24" jumps hero to façade chapter and scrolls to it | PASS — t = 25.00 s |
| QA-NAV-SCROLLSPY | 011 | Header marks the section in view (`aria-current`) | PASS — "Full service support" |
| QA-SERVICE-PRESELECT | 017, 019 | Clicking "Training" pre-selects it in the form | PASS |
| QA-FORM-VALIDATION | 019 | Empty submit → 2 errors, `aria-invalid`, focused error summary | PASS |
| QA-FORM-EMAIL-FORMAT | 019 | Malformed email rejected | PASS |
| QA-FORM-PREVIEW-STATE | 019 | Valid submit shows labelled preview state; nothing sent | PASS |
| QA-WATCH-VIDEO | 023 | Click-to-watch film loads on demand, plays with sound, native controls, focus moved | PASS |
| QA-DATASHEET-PDF | 016 | Datasheet download served | PASS — 200 `application/pdf` |
| QA-COPY-PENDING | 008, 018, 019 | Pending flags visible in served HTML | PASS — "Copy pending", "Proposed fields · pending approval", "Privacy notice wording pending" present (curl of `/`) |
| QA-ONE-H1 / QA-LANG-EN-GB / QA-IMG-ALT / QA-NOINDEX-PREVIEW | 006, 030 | Structure | PASS — 1 h1; `en-GB`; 0 images without alt; `noindex, nofollow` |

## 4. Mobile and keyboard (390 px, automated)

| ID | Scenario | Result |
|---|---|---|
| QA-SKIP-LINK-FIRST | First Tab reaches "Skip to content" | PASS |
| QA-DRAWER-OPEN | Menu opens dialog, focus inside, page scroll locked | PASS |
| QA-DRAWER-FOCUS-TRAP | 12 × Tab stays inside the drawer | PASS |
| QA-DRAWER-ESC-RETURNS-FOCUS | Esc closes and returns focus to "Menu" | PASS |
| QA-SPEC-MOBILE-COLLAPSE | General specs open; other 4 groups collapsed | PASS |
| QA-SPEC-MOBILE-EXPAND | Toggle opens a group (`aria-expanded`) | PASS |

## 5. Accessibility

| Check | Result |
|---|---|
| axe-core 4.x, tags WCAG 2.0/2.1 A+AA and 2.2 AA, 1440 | VERIFIED_PASS — 0 violations |
| axe-core, 390 | VERIFIED_PASS — 0 violations (one `label-content-name-mismatch` found in an earlier run on film play buttons, fixed and re-tested) |
| Contrast of every token pair | VERIFIED_PASS — computed; lowest text pair 5.26:1, non-text ≥ 3.43:1 (02 §4.1) |
| Reduced motion | VERIFIED_PASS — QA-REDUCED-MOTION: hero paused with "Play film", reveal animation `none` |
| Manual screen-reader pass (NVDA / VoiceOver) | NOT_TESTED |
| 200 % zoom / text-spacing override | NOT_TESTED |

## 6. Responsive

| Width | Horizontal overflow | Visual review |
|---|---|---|
| 1440 | none (`scrollWidth = clientWidth`) | VERIFIED_PASS — every section reviewed |
| 1024 | none | VERIFIED_PASS — hero stacks; drawer navigation |
| 768 | none | VERIFIED_PASS — first viewport reviewed |
| 390 | none | VERIFIED_PASS — every section reviewed |
| 360 | none | VERIFIED_PASS — support section reviewed |

Evidence: `qa/overflow-check.txt`, `qa/screens/first-viewport-*.png`.

## 7. Media and performance

| Check | Result |
|---|---|
| First-view transfer (no video), 20 Mbps throttle | ~0.86 MB at 1440 and 390 (images ~0.6 MB, JS 145 KB, fonts 88 KB) |
| Hero streaming with motion allowed | ~9.6 MB in the first 10 s (1440, 1080p file) · ~4.9 MB (390, 540p file) — progressive, non-blocking |
| Responsive hero source | VERIFIED_PASS — 540p served ≤ 767 px, 1080p above |
| Watch films | Nothing downloaded until clicked (verified in QA-WATCH-VIDEO) |
| LCP (local, not field data) | ~0.6 s — indicative only |
| Lighthouse / field Core Web Vitals | NOT_TESTED |

## 8. Not covered (be explicit)

- Real devices (iOS Safari, Android Chrome) and Firefox/Safari engines: NOT_TESTED — only Chromium was available.
- Live form delivery: NOT_APPLICABLE — preview has no backend by design and says so on screen.
- Figma file and walkthrough: BLOCKED_EXTERNAL (human entrant).

## 9. Open items before production

UK regulatory copy · service descriptions · approved form fields, destination and privacy text · global site map · footer legal details · resolution of specification conflicts C-1 to C-6 (01 §8.1).
