# Project: delivered application code

**Status**: reference — code delivered by closed workstreams, 2026-10-17.
**Risk**: HIGH

<!-- scope
files:
  - src/order-total.mjs
  - tests/order-total.test.mjs
  - .github/workflows/ia-first.yml
-->

## 1. Need

Keep the code delivered by closed workstreams covered by a `scope` block
once their brief is condensed into `docs/projects/journal.md` (the scoping
reminder reports any code file outside every brief). Not a workstream to
start: a new workstream that touches one of these files lists it in its
own scope block.

## 2. Content

- `src/order-total.mjs`, `tests/order-total.test.mjs`,
  `.github/workflows/ia-first.yml`: order total with a 10 % discount
  (`APP-001`), journal entry of 2026-10-17.

## 3. Decisions

- 2026-10-17 — A reference brief keeps delivered code in scope, as
  `docs/projects/kit-mechanics.md` does for the kit's files: the closing
  recipe deletes a finished brief, the scoping reminder requires every code
  file to stay covered (agent, at the closing of the order-total workstream).

## 4. Related contracts

`APP-001` (order total), QUA-013 (the CI workflow replays every check),
SEC-006 (no runtime dependency).

## 5. Hand-off

- **Last state** (2026-10-17): created at the closing of the order-total
  workstream.
- **Uncommitted work**: none once the closing commit is made.
- **Next step**: none — updated at each closing that delivers code.
