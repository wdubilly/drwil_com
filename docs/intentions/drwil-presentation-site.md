# Intent: drwil presentation site on Netlify

**Status**: proposed on 2026-10-18.

## Need

A real technical presentation site for drwil, deployable on Netlify,
bilingual (French and English), serving as a support for the project. It
must explain faithfully, with interactive visuals (3D for example):
- what drwil is, what it brings to a project, for whom and for what;
- all its loops (commit, push, CI, verify, closing, workstream queue);
- where the human stays in the loop (framing, start, attestation, merge);
- the proposed workflow (SCOPING, BUILD, EVIDENCE, VERIFY, CLOSING).

The mermaid file `docs/drwil-overview.mmd` is only the faithful source map
the visuals are built from, not the deliverable.

## Current state

Read on 2026-10-18:
- No site, no front-end code, no netlify.toml in the repository; the stack
  is not decided.
- `docs/drwil-overview.mmd` exists (mermaid flowchart, not yet rendered or
  validated with mermaid).
- Third-party skills `emilkowalski/skills` (design and animation) were
  considered: `emil-design-eng`, `animate`, `review-animations`,
  `animation-performance`, `mobile-native`, `break-ui`, `prototype` are
  relevant; `animate-expo`, `write-swift`, `ask-sonner` are not. Only the
  first lines of a few SKILL.md were read; installing them
  (`npx skills@latest add emilkowalski/skills`) writes third-party files
  into the repository and was not done.

## Open questions

- [decided 2026-10-18] Stack: Vite, React, TypeScript, React Three Fiber
  (replaces the earlier Astro choice). Code in website/ at the root of this
  repository, separate from the kit's own dependencies. Still to settle:
  package manager, tests, performance budget on mobile.
- [decided 2026-10-18] Languages: English and French from the first
  version.
- [decided 2026-10-18] Creative direction « Control Room / Proof Engine »:
  hero 3D scene with static fallback, "From intent to evidence" chain,
  interactive illustrative demo with three scenarios (PASS, FAIL, ERROR or
  MANUAL), seven-stage workflow, non-regression comparison, verdicts, trust
  boundaries, install section. Content is taken from the real
  wdubilly/drwil implementation, with no unreleased feature presented as
  shipped.
- [decision] Pages and content: what must a visitor learn (problem,
  workflow, contracts, install)? Which sources are reused from `docs/`
  without copying them (one source per information)?
- [decision] Bilingual: separate routes (/fr, /en) or a switcher; which
  language is the default?
- [decision] Visual approach: 3D (Three.js or similar) or 2D animated; one
  guided scene per loop? Accessibility fallback (reduced motion, no WebGL)
  and mobile performance.
- [decision] Audience and tone: who reads first (tech lead, developer,
  decision maker), and what must they remember after one minute?
- [decision] Source of truth: how the site stays faithful to the kit when
  it evolves (generated from docs/ and the overview map, or hand-written)?
- [decision] Install the design skills? If yes, which ones and where
  (`.claude/skills`, `.agents`), knowing that a third-party file enters the
  scope check and a human reads it first.
- [decision] Netlify: site name, domain, deploy previews on pull requests,
  netlify.toml content.
