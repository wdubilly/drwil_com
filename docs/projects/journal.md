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
