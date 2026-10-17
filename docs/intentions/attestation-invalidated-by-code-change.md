# Intent: Attestation made obsolete when the covered code changes

**Status**: proposed on 2026-10-17.

## Need

A human attestation should stop counting as valid when what it covers changes, not only when its contract's text changes.

## Current state

Read on 2026-10-17 (gap 4 of `docs/experiments/acceptance-criteria-report.md`, scenario S6 of `tests/acceptance-demo.test.mjs`): an attestation is bound to the contract's text and proof definition; adding a dependency keeps SEC-006 attested. S6 asserts this current behavior and will fail once the gap is closed.

## Open questions

- [decision] Bind an attestation to the files of its contract's **Scope**, to a commit, or to an expiry date?
- [decision] Solve it in drwil itself (its own repository) or work around it in this project?
