# Intent: Merge gate on the required checks

**Status**: proposed on 2026-10-17.

## Need

No merge into the main branch without the kit's CI job green, set up and checked with the project rather than by hand.

## Current state

Read on 2026-10-17 (gap 5 of `docs/experiments/acceptance-criteria-report.md`, scenario S7): `main` of `wdubilly/drwil_com` requires the `checks` job since 2026-10-17, enabled by hand; the kit neither sets it up nor checks it. A red PR actually blocked was not observed: the pre-push hook prevents pushing a regression, and bypassing it is refused (QUA-019).

## Open questions

- [decision] Should a kit check verify the host's branch protection?
- [decision] Observe a red PR blocked (how, without bypassing a check)?
- [decision] Solve it in drwil itself (its own repository) or work around it in this project?
