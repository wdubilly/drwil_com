# Report: acceptance criteria as durable controls (drwil 0.6.1)

As of 2026-10-17. Experiment scoped by `docs/projects/acceptance-criteria-demo.md`;
replayed by `tests/acceptance-demo.test.mjs` (check `QUA-041`, contract QUA-041 —
a deliberate regression and a missing proof are detected). This report is the
object of QUA-042 (judged by the requester).

## How to replay

```
node --test --test-name-pattern "QUA-041" "tests/*.test.mjs"
```

Each scenario copies the working tree (tracked and untracked, not ignored)
into a temporary folder, commits it on a `demo` branch, applies one change,
runs the kit's real `drwil verify --json` (and, for S2, a real `git commit`
through `.githooks/`), compares the verdict with the expected one, then
deletes the copy. The repository itself is never modified. The same check
runs on commit, on push and in CI (`.github/workflows/ia-first.yml`).

## Results by scenario

| # | Change in the copy | Observed (2026-10-17, local run) | Verdict |
|---|---|---|---|
| S1 | none | the kit's parser links « 100 € → 90 € » to `APP-001`; `verify` reports `APP-001` pass with its check `APP-001` ok | as expected |
| S2 | `<` → `<=` on the 100 € threshold | `APP-001` fail, verdict not PASS; `git commit` refused, every failed check names `APP-001` | as expected |
| S3 | `APP-001` check removed from `.drwil/ia-first.json` | `APP-001` not pass, verdict not PASS | as expected |
| S4 | unattested `Manual` contract added | that contract `manual`, verdict not PASS, exit code 1 | as expected |
| S5 | text of attested QUA-015 changed | attested → `manual` | as expected |
| S6 | a dependency added under attested SEC-006 | stays `attested` | **gap confirmed** |
| S7 | real PR on GitHub (#2) | `main` protection requires `checks` (strict, applied to admins); `checks` green on the PR, merge state `CLEAN` | configuration as expected; a red PR actually blocked not observed |

Local run: 6 tests, 6 pass, about 6 s. CI run on GitHub (commit
`e94800b`): the same 6 pass, after `npm ci`. A negative control run by hand
outside the tests (to inspect raw outputs) was not run: not verified
independently; the tests' assertions check that each change applied and,
for S2, that the refusal comes from `APP-001` only.

## Proposed acceptance criteria — what the kit checks by machine

| Criterion | Machine-checked | Declarative / human | Status |
|---|---|---|---|
| 1. A criterion is identified and linked to a task | a criterion line must end with a registered contract ID (`check-docs`); start and closing refused without criteria | the criterion has no ID of its own: text + contract | met, with a limit (gap 1) |
| 2. Human acceptance distinguished from the agent's proposal | only the start gesture (interactive terminal or poll read by a hook) and `drwil attest` (interactive terminal) | criteria validation is a line written by the agent in the brief's « Decisions »; attestation identity is `git config user.name`, declarative | **not met by the kit** (gap 2) |
| 3. An automated proof is linked to the control actually run | contract → **Check** → declared command; `verify` reports each check's status; QUA-029 checks the cited tests carry the ID | — | met (S1) |
| 4. Tests kept in the repo and run by CI | QUA-013: « not run » fails on push and in CI; `ci-coverage` re-reads the CI file | branch protection is a GitHub setting outside the kit | met: CI runs it, `main` requires it (S7); blocking a red PR not observed |
| 5. A deliberate regression is detected | check fail, verdict FAIL, commit refused | — | met (S2) |
| 6. Missing proofs and pending validations never shown as successes | not run ≠ pass; `manual` and exit code 1; obsolete attestation → `manual` | — | met (S3, S4, S5), with gap 4 |
| 7. Reproducible demonstration | one command, throwaway copies, same check in CI | — | met, locally and in CI |

## Gaps found

1. **Criteria are not re-evaluated in CI nor after closing.** `drwil verify`
   reads the criteria of the brief named by `.drwil/state.json`, a local
   file ignored by git (`node_modules/drwil/dist/criteria.js` (if present),
   `activeBrief`). CI has no state, and closing deletes the brief: from then
   on only contracts are replayed. Durability goes through the contract, not
   through the criterion.
2. **Human acceptance of each criterion is not recorded.** The kit
   distinguishes a human gesture at start (whole brief) and per `Manual`
   contract (`drwil attest`), not per criterion; « validated by the
   requester » is text written by the agent.
3. **Execution results are not kept in the repository.**
   `.drwil/evidence/verify-*.json` and `criteria-*.md` are ignored by git;
   only attestations are versioned. The trace of a run is in CI logs only.
4. **An attestation survives a change of what it covers** (S6). It is bound
   to the contract's text and proof definition, not to the files in its
   scope: adding a dependency keeps SEC-006 attested.
5. **No merge gate by default.** The kit's CI job runs, but nothing
   prevents a merge before it ends: `gh pr merge --auto` merged PR #1 at
   once, no check being required (its CI happened to be green already).
   Branch protection is a host setting, enabled by hand here on
   2026-10-17 (increment 2): the kit neither sets it up nor checks it.
6. **Lifecycle frictions.** A brief must cite a contract already in the
   registry, but writing the registry while scoping triggers the scope
   gate's warning; closing deletes the brief while every code file must
   stay under a brief's scope (solved here by the reference brief
   `docs/projects/delivered-code.md`).
