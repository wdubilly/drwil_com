# Intent: Contract registry and brief deletion frictions in the lifecycle

**Status**: proposed on 2026-10-17.

## Need

Scope and close a workstream without warnings that contradict the kit's own rules.

## Current state

Read on 2026-10-17 (gap 6 of `docs/experiments/acceptance-criteria-report.md`): a brief must cite a contract already in the registry, but writing `docs/contracts.md` while scoping triggers the scope gate's warning; closing deletes the brief while every code file must stay under a brief's scope, worked around by the reference brief `docs/projects/delivered-code.md`.

## Open questions

- [decision] Keep the reference-brief workaround, or ask drwil for a « contract to create » marker and a delivered-code status?
- [decision] Solve it in drwil itself (its own repository) or work around it in this project?
