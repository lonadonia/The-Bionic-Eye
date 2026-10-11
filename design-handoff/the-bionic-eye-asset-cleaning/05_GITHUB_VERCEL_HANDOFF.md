# 05 · GitHub and Vercel handoff

```
Project:            The Bionic Eye — Asset Cleaning (ABZ C10) · contest preview
Implementation:     BUILT — single page, all six sections + header and footer
Stack:              Next.js 16.4.0 (App Router, static) · React 19.3.0 · TypeScript 5.9.3 · Tailwind CSS 4.3.3
Package manager:    npm 11.19.0 (package-lock.json committed) · Node ≥ 20.9 (built locally on 24.21.0)
Local path:         C:\Users\PC\Desktop\W\Freelance & bot\contests\7\the-bionic-eye
Local build:        PASS — `npm run build` exit 0; `npx eslint .` exit 0; `npx tsc --noEmit` exit 0
QA:                 28/28 interaction + axe checks PASS; copy audit 0 unverified; no overflow at 1440/1024/768/390/360
GitHub status:      PUSHED — normal push, no force; remote main verified equal to local (git ls-remote + GitHub API)
GitHub repo URL:    https://github.com/lonadonia/The-Bionic-Eye
Visibility:         public (verified via GitHub API, 11 Oct 2026)
Branch:             main
Code commit SHA:    e5064fefb603956a66937df10a6ee00c70926e4c (initial delivery; this document was updated in the following commit)
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

Source code, `package-lock.json`, `public/media` (≈ 110 MB of optimised video, posters, images and logo SVGs; largest file 29 MB), the datasheet PDF, the handoff documents, exports and QA evidence. Not pushed: the original asset pack (≈ 2.7 GB), `node_modules`, `.next`, `.env*`, `.vercel`.

## Vercel

Import settings (dashboard or API): framework **Next.js**, root directory **/**, build `next build`, output default, install `npm ci`/default, Node 20.x or later. No environment variables.

Deployment-protection note: new Vercel projects usually protect **preview** URLs with Vercel Authentication, so judges may see a login wall. To share a public link either promote a verified deployment to production (`<project>.vercel.app`) or adjust Deployment Protection in Project Settings — both are deliberate decisions for the account owner.

After a Git link, every push to `main` creates a **production** deployment; push to another branch for a preview.

## Next actions for the entrant

1. Build the Figma file from `06_FIGMA_BUILD_SPEC.md`; set link access to "can view".
2. Record the 2–3 minute walkthrough in your own voice (`07_WALKTHROUGH_OUTLINE.md`).
3. Submit: Figma link, recording, `exports/asset-cleaning-1440-full.png`, `exports/asset-cleaning-390@2x-hero-applications.png`, and the note in `08_DESIGN_NOTE.md`.
4. Ask the client for the items in `01_CLIENT_BRIEF_ANALYSIS.md` §8.3 before any production build.
