# Project: demonstrate acceptance criteria as durable controls

**Status**: 2026-10-17 — increment 1 implemented, not committed; increment 2 [human] to do.
**Risk**: HIGH
**Maturity**: ready
**Intent**: `docs/intentions/acceptance-criteria-durable-memory.md`

<!-- scope
files:
  - tests/acceptance-demo.test.mjs
  - .drwil/ia-first.json
  - .github/workflows/ia-first.yml
  - docs/contracts.md
  - docs/architecture.md
  - docs/experiments/acceptance-criteria-report.md
-->

## 1. Need

Demonstrate, in this repository used as the reproducible test repository,
how far drwil 0.6.1 already turns validated acceptance criteria into
durable, traceable controls run at each integration — and report its gaps.
A test file replays each scenario in a throwaway clone (`git clone` into a
temporary folder), applies one change there, runs the kit's real checks and
compares the verdict obtained with the expected one. The real working tree,
`src/` and the kit's files are never modified.

| # | Scenario (in the clone) | Expected verdict |
|---|---|---|
| S1 | `drwil verify --evidence` on the current state | every criterion linked to its contract, check and tests; PASS |
| S2 | break the rule (`>=` → `>` on the 100 € threshold) | `APP-001` check fails, commit refused, verify FAIL |
| S3 | remove the `APP-001` check declaration | not run or ERROR, never PASS |
| S4 | add a `Manual` contract with no attestation | MANUAL, exit code 1, never PASS |
| S5 | change the text of an attested contract (QUA-015) | attestation obsolete, back to MANUAL |
| S6 | change code under an attested contract, its text untouched | stays ATTESTED — expected gap, reported as such |
| S7 | real, on GitHub: CI runs `APP-001` on the PR; `main` requires the `checks` job | no merge without green CI |

## Acceptance criteria

- An acceptance criterion is identified and linked to its task: S1 shows each criterion of a brief with its contract and its verdict — `QUA-041`
- The requester's acceptance is distinguished from the agent's proposal: the report states what the kit checks by machine and what stays declarative, judged by the requester [human] — `QUA-042`
- An automated proof is linked to the control actually run: S1 shows each contract's check and its result — `QUA-041`
- The associated tests are kept in the repository and run by CI: S7 — `QUA-013`
- A deliberate regression causes a detectable failure: S2 — `QUA-041`
- Missing proofs and pending human validations are never presented as successes: S3, S4, S5 — `QUA-041`
- The demonstration is reproducible: one command (`node --test --test-name-pattern "QUA-041"`) replays S1–S6 in a throwaway clone and fails if any verdict differs from the expected one — `QUA-041`

## 2. Out of scope

- Any change to `src/`, `tests/` or the kit's files (`docs/projects/kit-mechanics.md`).
- Resolving the intent's other open questions (criterion's own identifier,
  keeping execution results in the repository, attestation made obsolete by
  a code change): documented by the experiment, not solved.
- Bypassing any check, even on a throwaway branch (QUA-019 — no bypassing a check).

## 3. Constraints

- The tests never write outside its temporary clone and deletes it at the end.
- No runtime dependency added (SEC-006 — no known vulnerable dependency): Node.js 24 standard library only.
- Attestations cannot be created by a test (interactive terminal only): S5 and S6 reuse the ones already committed.

## 4. Decisions

- 2026-10-17 — The demonstration happens in `drwil_com`, the kit's files stay untouched (requester).
- 2026-10-17 — `main` protected on GitHub, the `checks` job required before merge (requester; gesture [human], increment 2).
- 2026-10-17 — Regression detection proven locally (S2), and CI proven to replay the same check (S7); no bypass of the pre-push hook (requester).
- 2026-10-17 — The 7 acceptance criteria above, as proposed in the intent, linked to the scenarios; criterion 2 is `[human]` (requester).
- 2026-10-17 — The intent's other open questions are out of scope (requester).
- 2026-10-17 — QUA-041 and QUA-042 are registered in `docs/contracts.md` at scoping, QUA-041 with a **Manual** field « check to complete » until increment 1 wires its check: the kit refuses a brief citing a contract absent from the registry (agent, approved with the brief).

## 5. Points to decide

None.

## 6. Increments

- **Increment 1 — demonstration script, contracts, report** [AI]:
  `tests/acceptance-demo.test.mjs` (scenarios S1–S6, each
  named `QUA-041: …`), declared as the `QUA-041` check in
  `.drwil/ia-first.json`; CI installs the dev dependencies (`npm ci`) so
  the tests can run `drwil verify`; QUA-041 completed in
  `docs/contracts.md` (its **Check** and **Tests** replace its **Manual**
  field); the demo tests in `docs/architecture.md`; report
  `docs/experiments/acceptance-criteria-report.md`, scenario by
  scenario, with the kit's gaps. Exit criterion:
  `node .githooks/run-checks.mjs` green and `drwil verify --agent` with no
  FAIL nor ERROR.
- **Increment 2 — protected branch and CI proof** [human]: enable branch
  protection on `main` (required status check `checks`), then S7 is
  observed on this workstream's PR. Exit criterion: the PR shows the
  `checks` job as required and green.
- **Closing**: each confirmed gap becomes an intent (`docs/intentions/`);
  QUA-042 attested by the requester after reading the report.

## 7. Hand-off

- **Last state** (2026-10-17): increment 1 implemented — `tests/acceptance-demo.test.mjs` (S1–S6, 6/6 pass locally), `QUA-041` check declared and contract completed, `npm ci` added to CI, map updated, report `docs/experiments/acceptance-criteria-report.md` written (6 gaps). `drwil verify --agent`: 9 PASS, 3 ATTESTED, 0 FAIL, 1 MANUAL (QUA-042, by design).
- **Uncommitted work**: all of increment 1.
- **Next step**: [human] approve the commit and push; then enable branch protection on `main` (required status check `checks`) so S7 can be observed on the PR; QUA-042 attested only after reading the report.
