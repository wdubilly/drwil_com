# Intent: Execution results kept in the repository

**Status**: proposed on 2026-10-17.

## Need

Keep the trace of each verification run (criterion → contract → check → result) in the repository, not only in CI logs.

## Current state

Read on 2026-10-17 (gap 3 of `docs/experiments/acceptance-criteria-report.md`): `.drwil/evidence/verify-*.json` and `criteria-*.md` are ignored by git; only attestations are versioned.

## Open questions

- [decision] Version every run, only the closing one, or keep CI logs as the trace?
- [decision] Solve it in drwil itself (its own repository) or work around it in this project?
