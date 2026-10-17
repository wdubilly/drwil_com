# Project: order total with a 10 % discount from 100 €

**Status**: scoped on 2026-10-17 — increment 1 to start.
**Risk**: HIGH
**Maturity**: ready

<!-- scope
files:
  - src/order-total.mjs
  - tests/order-total.test.mjs
  - package.json
  - .drwil/ia-first.json
  - .github/workflows/ia-first.yml
  - .github/pull_request_template.md
-->

## 1. Need

Compute the total of an order: sum of its lines, minus a 10 % discount when
the pre-discount amount is greater than or equal to 100 €. First business
rule of the project, to be protected durably against regressions (local hook
and CI).

## Acceptance criteria

- An order totalling 80 € has a total of 80 € (no discount under the threshold) — `APP-001`
- An order totalling 100 € has a total of 90 € (threshold inclusive) — `APP-001`
- An order totalling 120 € has a total of 108 € — `APP-001`
- An empty order has a total of 0 € — `APP-001`
- The discount is applied only once, on the raw subtotal of the lines; recomputing the same order gives the same result — `APP-001`
- Boundaries (99.99 € → 99.99 €, 100.01 € → 90.01 €, rounded half-up to the cent) and invalid inputs (negative, non-integer or non-finite amount, invalid quantity, malformed order) are rejected with an explicit error — `APP-001`
- The change degrades no applicable quality check; checks run in CI — `QUA-013`

## Modified contracts

- `APP-001` — former criterion: « (example) An order with no line is refused » — reason: the kit's example contract is replaced by the project's first business rule, as `docs/recipes/adopt-the-kit.md` step 5 prescribes (approved on 2026-10-17)

## 2. Out of scope

- Currencies other than euro, taxes (VAT), shipping costs, other discount rules.
- Any API route, screen, persistence or network flow.
- Pushing, opening a pull request or merging (only on explicit request).

## 3. Constraints

- No runtime dependency added (SEC-006 — no known vulnerable dependency).
- Amounts are integer cents: no floating-point error.

## 4. Decisions

- 2026-10-17 — Stack: Node.js 24, ES modules, native runner `node --test`, no dependency (requester).
- 2026-10-17 — Amounts in integer cents; discount rounded half-up to the cent; invalid input throws `TypeError`/`RangeError` (requester).
- 2026-10-17 — CI: GitHub Actions, running `run-checks` (requester).
- 2026-10-17 — Acceptance criteria above validated as is (requester).

## 5. Points to decide

- [human] Remote repository: CI only runs once the repo is pushed to GitHub; no push without an explicit request.

## 6. Increments

- **Increment 1 — rule, tests, contract, CI** [AI]: the order-total module
  and its tests (files listed in the scope block), tests named
  `APP-001: …`, the `APP-001` check declared in `.drwil/ia-first.json`, the
  GitHub workflow. Exit criterion:
  `node .githooks/run-checks.mjs` green and `drwil verify --agent` with no
  FAIL nor ERROR on `APP-001` and `QUA-013`.

## 7. Hand-off

- **Last state** (2026-10-17): scoped, criteria validated by the requester.
- **Uncommitted work**: the whole kit installation and this brief (repository has no commit yet).
- **Next step**: [human] start the workstream (`/drwil-start`).
