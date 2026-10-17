# Intent: Acceptance criteria re-evaluated in CI and after closing

**Status**: proposed on 2026-10-17.

## Need

Keep a workstream's acceptance criteria evaluated after the agent's session: in CI, and once the brief is condensed at closing.

## Current state

Read on 2026-10-17 (gap 1 of `docs/experiments/acceptance-criteria-report.md`): `drwil verify` reads the criteria of the brief named by `.drwil/state.json` (if present), a local file ignored by git; CI has no state, and closing deletes the brief. Only contracts are replayed afterwards.

## Open questions

- [decision] Is the contract enough as the durable trace of a criterion, or must the criteria themselves stay evaluated?
- [decision] Solve it in drwil itself (its own repository) or work around it in this project?
