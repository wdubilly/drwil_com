# Closed projects journal

Condensed summary of each `docs/projects/` brief once its Status moves to
"done" (the whole brief, not just one point among several of a brief that
otherwise stays open). The detailed brief is then deleted: no more full
history in plain text in the repository, but nothing is lost —
`git log --follow -- docs/projects/<brief>.md` (or the closing commit/PR
cited below) retrieves the full text at any time.

Goal: keep `docs/projects/` light (active briefs only) without sacrificing
traceability, which stays in git anyway. See the recipe
`docs/recipes/working-with-branches.md`, "Closing" section.

One entry per closed project, most recent last.

## 2026-10-17 — Order total with a 10 % discount from 100 €

- **Delivered**: `orderTotal` (`src/order-total.mjs`), total in integer
  cents, 10 % off from 100 € inclusive, rounded half-up to the cent,
  invalid input rejected (`TypeError`/`RangeError`). Contract `APP-001`
  (`docs/contracts.md`), proven by `tests/order-total.test.mjs` and its own
  check; GitHub Actions CI running `.githooks/run-checks.mjs`.
- **Key decisions**: Node.js 24, ES modules, `node --test`, no runtime
  dependency; amounts in integer cents; automatic merge chosen at start.
- **Closing**: delivered code kept in scope by `docs/projects/delivered-code.md`; PR `workstream/kit-installation` → `main`; `drwil verify`
  PASS (8 PASS, 3 attested by a human: SEC-006, QUA-015, QUA-019).
- **Known limits**: quantity 0 rejected without a decision
  (`docs/intentions/order-line-quantity-zero.md`); `stack` key left empty
  (`docs/intentions/declare-the-stack.md`); token consumption not measured
  (no session log found by `.githooks/consumption.mjs`).

## 2026-10-17 — Demonstrate acceptance criteria as durable controls

- **Origin**: intent « acceptance criteria turned into durable controls »
  (requester, 2026-10-17), summarised here and removed: need fully scoped
  by this workstream, its open questions carried by the intents below.
- **Delivered**: `tests/acceptance-demo.test.mjs`, scenarios S1–S6 replayed
  in throwaway copies of the working tree (check and contract QUA-041 — a
  deliberate regression and a missing proof are detected), run locally and
  in CI (`npm ci` added); report `docs/experiments/acceptance-criteria-report.md`
  (contract QUA-042, attested by the requester); `main` protected, `checks`
  required (S7, by the requester).
- **Result**: of the 7 proposed criteria, 3 met (proof linked to the check
  run, regression detected, reproducible), 3 partially met (criterion ↔
  task, tests run by CI, missing proofs never shown as successes), 1 not
  met by the kit (human acceptance per criterion).
- **Key decisions**: demonstration in `drwil_com`, kit untouched; no check
  bypassed, even on a throwaway branch; QUA-041 and QUA-042 registered at
  scoping; criteria with a remaining limit marked « partially met »
  (requester's review).
- **Closing**: PR #2, `drwil verify` PASS (9 PASS, 4 attested by a human).
  A first closing attempt found a bug in the demo tests (a tracked file
  deleted but not staged broke every copy): workstream restarted by the
  requester, bug reproduced then fixed in its own commit (`dec9e5c`).
- **Known limits**: criteria not re-evaluated in CI nor after closing
  (`docs/intentions/criteria-reevaluated-in-ci.md`); no human acceptance
  per criterion (`docs/intentions/per-criterion-human-acceptance.md`); run
  results not versioned (`docs/intentions/versioned-run-results.md`);
  attestation surviving a code change
  (`docs/intentions/attestation-invalidated-by-code-change.md`); merge gate
  set by hand, red PR blocked not observed
  (`docs/intentions/merge-gate-required-checks.md`); lifecycle frictions
  (`docs/intentions/scoping-closing-frictions.md`). Not an intent: the
  manual negative control of S2/S3 was declined by the requester, so the
  observed statuses rest on the tests' assertions only. Token consumption
  not measured.
