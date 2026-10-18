# Project: drwil presentation website

**Status**: in progress on 2026-10-18 — site built in `website/`, checks `SITE-001`, `SITE-003`, `SITE-004`, `SITE-005` green locally; `SITE-002` awaits the requester's attestation.
**Risk**: HIGH
**Maturity**: ready
**Intent**: `docs/intentions/drwil-presentation-site.md`

<!-- scope
files:
  - website/src/*
  - website/tests/*
  - website/e2e/*
  - website/scripts/*
  - website/public/*
  - website/index.html
  - website/package.json
  - website/pnpm-lock.yaml
  - website/vite.config.ts
  - website/vitest.config.ts
  - website/tsconfig.json
  - website/playwright.config.ts
  - netlify.toml
  - .github/workflows/ia-first.yml
  - .drwil/ia-first.json
-->

## 1. Need

A technical, bilingual (English and French) presentation website for drwil,
deployable on Netlify, serving as a support for the project. Creative
direction « Control Room / Proof Engine »: a hero 3D scene, the chain from
intent to evidence, an interactive illustrative demonstration, the
seven-stage workflow, a non-regression comparison, the verdicts, the trust
boundaries and the installation. The content comes from the real
implementation in `wdubilly/drwil` (README, installation guide, contracts,
verification engine, evidence, CI); no unreleased feature is shown as
shipped. Overview source map: `docs/drwil-overview.mmd`.

## Acceptance criteria

- The demonstration never shows PASS while its scenario holds an unresolved
  blocking obligation, and each scenario updates criterion, contract, check,
  evidence and verdict together — `SITE-001`
- Every claim on the site traces to the real drwil implementation or is
  worded as a limitation — `SITE-002` [human]
- The content stays readable and complete without WebGL and with reduced
  motion — `SITE-003`
- The site builds, and English and French expose the same pages and links
  — `SITE-004`
- Every link points to a real destination — `SITE-005`

## 2. Out of scope

- Any backend, account, authentication, pricing, cloud dashboard.
- Any change to the drwil CLI or its governance rules.
- Running a real drwil engine in the browser: the demonstration uses sample
  data and says so.
- Adding the third-party Emil Kowalski skills (separate decision).

## 3. Constraints

- Code in `website/`, with its own dependencies, apart from the kit's.
- Vite, React, TypeScript, React Three Fiber; Netlify deployment through
  netlify.toml.
- Accessibility: semantic HTML, keyboard navigation, visible focus, no status
  conveyed by color alone, `prefers-reduced-motion` respected, static
  fallback when WebGL is unavailable.
- Performance: 3D lazy-loaded, lighter on mobile, paused when off screen.
- Scope touches `.drwil/ia-first.json` (the checks of the `SITE-*`
  contracts): hence risk HIGH.

## 4. Decisions

- 2026-10-18 — Stack: Vite, React, TypeScript, React Three Fiber (requester).
- 2026-10-18 — Languages: English and French from the first version.
- 2026-10-18 — Code location: `website/` at the root of this repository.
- 2026-10-18 — Tools: pnpm; Vitest (demonstration logic, i18n); Playwright
  (visual and fallback tests); a link check script.
- 2026-10-18 — Routing: `/en` and `/fr` routes, English by default, language
  selector in the navigation bar.
- 2026-10-18 — Mobile budget: initial JS at most 150 KB gzip, 3D loaded
  separately, LCP under 2.5 s on mobile.
- 2026-10-18 — Netlify: netlify.toml shipped; site name, domain and deploy
  previews decided later by the requester, outside this first version.
- 2026-10-18 — Branch: merge the kit update first, then work on
  `website/presentation`.
- Related contracts to know: QUA-017 (no direct work on the main branch),
  QUA-019 (no bypassing a check), SEC-007 (no secret in the repo), SEC-006
  (no known vulnerable dependency), QUA-016 (scoping reminder).

## 5. Points to decide

- [human] Merge `maj/drwil-0.6.4` into main, then create the branch
  `website/presentation` before starting the workstream.

## 6. Increments

- **Increment 1 — foundations** [AI]: `website/` skeleton, tokens, bilingual
  layout, netlify.toml, the `SITE-*` contracts and their checks. Exit
  criterion: `SITE-004` and `SITE-005` pass.
- **Increment 2 — content and chain** [AI]: hero with fallback, « From intent
  to evidence », workflow, verdicts, trust boundaries, installation. Exit
  criterion: `SITE-003` passes.
- **Increment 3 — demonstration and regression** [AI]: three scenarios,
  non-regression comparison. Exit criterion: `SITE-001` passes.
- **Increment 4 — review** [human]: claims checked against the drwil
  repository. Exit criterion: `SITE-002` attested by the requester.

## 7. Hand-off

- **Last state** (2026-10-18): the site is implemented in `website/` (hero with
  lazy 3D scene and static fallback, chain, demonstration, workflow,
  non-regression, verdicts, boundaries, install, EN/FR); contracts `SITE-001`
  to `SITE-005`, their checks, CI steps and the architecture map are in place.
- **Uncommitted work**: everything of the workstream until the first commit.
- **Next step**: [human] read the copy against the drwil README and run
  `drwil attest SITE-002`; then merge the pull request and connect the
  repository to Netlify (site name, domain and previews are still open).
