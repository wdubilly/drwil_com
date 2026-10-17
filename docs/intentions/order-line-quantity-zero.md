# Intent: order line with a quantity of 0

**Status**: proposed on 2026-10-17.

## Need

The order-total workstream asked to reject an "invalid quantity" without
saying whether a line with a quantity of 0 is invalid or simply worth 0 €.

## Current state

Read on 2026-10-17: `src/order-total.mjs` rejects any quantity below 1 with
a `RangeError` (agent's choice while implementing `APP-001`), proven by
`tests/order-total.test.mjs`.

## Open questions

- [decision] A line with a quantity of 0: rejected (current behavior) or
  accepted and counted as 0 €?
