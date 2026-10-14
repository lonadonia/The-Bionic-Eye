# 05 · GitHub and Vercel handoff

## Refinement 3 (14 October 2026)

```
Implementation:     BUILT — richer C10 product presentation (product explorer, detail frames, Clean Station pair and
                    scroll scene, media viewer, decoration layers); copy unchanged. See docs/ASSET_CLEANING_REFINEMENT_3.md
Starting point:     local copy fast-forwarded to GitHub main c6d4f45 before any change (no local work to merge)
Local build:        PASS — npm run lint, npm run typecheck, npm run build (static prerender)
QA:                 60/60 interaction + axe checks PASS (Chrome 155, real H.264); copy audit 0 unverified;
                    hero contrast PASS at 1440/1280/1024; no overflow at 1440/1280/1024/768/720/640/390/360
Dependencies:       + gsap 3.15.0, + @gsap/react 2.1.2 (package.json and package-lock.json)
GitHub:             pushed normally (no force) to branch refinement-3-product-presentation in three commits
                    (7fe2382 code, f9155e4 films, 8f7d1f6 exports; one 66 MB push timed out with HTTP 408);
                    main left at c6d4f45. Verified with the GitHub API.
Pull request:       none opened from this environment (no GitHub CLI); compare link:
                    https://github.com/lonadonia/The-Bionic-Eye/compare/main...refinement-3-product-presentation
Vercel:             Git-linked project hakims-projects-8cc34b62/the-bionic-eye. Preview deployment for 8f7d1f6: state
                    "success" (GitHub deployments API), https://the-bionic-o4cixay8a-hakims-projects-8cc34b62.vercel.app
                    It is behind Vercel Authentication (HTTP 302 to the Vercel login from here), so its pages were NOT
                    opened from this environment; open it while signed in to Vercel. Production
                    (https://the-bionic-eye.vercel.app, HTTP 200) still serves main c6d4f45 (refinement 2).
Environment keys:   none
```

To publish on the production URL, merge the branch into `main` (fast-forward), or ask Claude to do it. Only the account owner should take that step.

---

## Refinement 2 (13 October 2026)

```
Implementation:     BUILT — internal prototype of the Asset Cleaning page from the contest copy PDF
Local build:        PASS — npm run lint, npm run typecheck, npm run build (static prerender)
QA:                 52/52 interaction + axe checks PASS (hero playback via VP9 stand-in); copy audit 0 unverified;
                    hero contrast 12/12 PASS; no overflow at 1440/1280/1024/768/720/640/390/360
GitHub:             refinement commit 3937d18 pushed normally (no force) to claude/new-session-hmdixa, then main
                    fast-forwarded to it at the owner's request ("put the new version in main so it shows on
                    Vercel"). No merge commit, no history rewrite; previous main was 95dc5f2.
Pull request:       none (direct fast-forward requested by the owner)
Vercel:             NOT VERIFIED from this environment. The brief's screenshot names the-bionic-eye.vercel.app, so
                    a Git-linked Vercel project appears to exist; a push to main normally triggers its production
                    deployment. *.vercel.app is blocked by this environment's egress policy (HTTP 403) and no Vercel
                    tool is attached, so the deployment and its URL must be checked in the Vercel dashboard.
Environment keys:   none
```

Open the branch preview in Chrome or Safari once to confirm H.264 playback of the hero loop and the click-to-watch films (this environment's Chromium has no H.264 decoder).

---

## Earlier delivery (11 October 2026)

```
Project:            The Bionic Eye — Asset Cleaning (ABZ C10) · contest preview
Implementation:     BUILT — single page, all six sections + header and footer
Stack:              Next.js 16.4.0 (App Router, static) · React 19.3.0 · TypeScript 5.9.3 · Tailwind CSS 4.3.3
Package manager:    npm 11.19.0 (package-lock.json committed) · Node ≥ 20.9 (built locally on 24.21.0)
Local path:         C:\Users\PC\Desktop\W\Freelance & bot\contests\7\the-bionic-eye
Local build:        PASS — `npm run build` exit 0; `npx eslint .` exit 0; `npx tsc --noEmit` exit 0
QA:                 30/30 interaction + axe checks PASS; hero text contrast PASS at 22 film frames; copy audit 0 unverified; no overflow at 1440/1024/768/390/360
GitHub status:      PUSHED — normal push, no force; remote main verified equal to local (git ls-remote + GitHub API)
GitHub repo URL:    https://github.com/lonadonia/The-Bionic-Eye
Visibility:         public (verified via GitHub API, 11 Oct 2026)
Branch:             main
Revisions:          e5064fe initial delivery · c8c1601 handoff status · next commit: hero as full-bleed background film (see git log)
Vercel readiness:   VERIFIED_READY — Next.js preset, default build, no env vars, no vercel.json required
Vercel preview:     PREVIEW_NOT_DEPLOYED — BLOCKED_EXTERNAL
Vercel URL:         NOT_AVAILABLE
Environment keys:   none
```

## Why there is no Vercel preview yet

Earlier in the session the Vercel connector was authenticated (Hobby account with the `lonadonia` GitHub namespace already installed). The Claude account was then switched, which disconnected that connector; the alternative Vercel connector needs a new browser OAuth authorisation by the account owner. Nothing was deployed, and no Vercel project was created for this repository.

To finish (either route, about two minutes):

- **Dashboard:** open https://vercel.com/new, choose the `lonadonia` GitHub account, import `The-Bionic-Eye`, keep the detected Next.js settings, Deploy. Importing from the dashboard deploys `main` to production (`<project>.vercel.app`).
- **Claude Code:** authorise the Vercel connector, then ask Claude to "create the Vercel preview" — it will link the repository and create a non-production preview deployment from `main`, then verify it.

## Important: the repository is public

`lonadonia/The-Bionic-Eye` was public when checked. It contains web derivatives of the client's films, photographs, logos and datasheet. If the contest terms or the client expect confidentiality, switch it to private (GitHub → Settings → General → Danger Zone → Change visibility). Vercel deployments keep working from a private repository.

## What was pushed

Source code, `package-lock.json`, `public/media` (≈ 78 MB of optimised video, posters, images and logo SVGs; largest file 18.7 MB), the datasheet PDF, the handoff documents, exports and QA evidence. Not pushed: the original asset pack (≈ 2.7 GB), `node_modules`, `.next`, `.env*`, `.vercel`.

## Vercel

Import settings (dashboard or API): framework **Next.js**, root directory **/**, build `next build`, output default, install `npm ci`/default, Node 20.x or later. No environment variables.

Deployment-protection note: new Vercel projects usually protect **preview** URLs with Vercel Authentication, so judges may see a login wall. To share a public link either promote a verified deployment to production (`<project>.vercel.app`) or adjust Deployment Protection in Project Settings — both are deliberate decisions for the account owner.

After a Git link, every push to `main` creates a **production** deployment; push to another branch for a preview.

## Next actions for the entrant

1. Build the Figma file from `06_FIGMA_BUILD_SPEC.md`; set link access to "can view".
2. Record the 2–3 minute walkthrough in your own voice (`07_WALKTHROUGH_OUTLINE.md`).
3. Submit: Figma link, recording, `exports/asset-cleaning-1440-full.png`, `exports/asset-cleaning-390@2x-hero-applications.png`, and the note in `08_DESIGN_NOTE.md`.
4. Ask the client for the items in `01_CLIENT_BRIEF_ANALYSIS.md` §8.3 before any production build.
