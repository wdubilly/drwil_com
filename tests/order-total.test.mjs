import assert from "node:assert/strict";
import { test } from "node:test";
import { orderTotal } from "../src/order-total.mjs";

const order = (...lines) => ({ lines: lines.map(([unitPriceCents, quantity = 1]) => ({ unitPriceCents, quantity })) });

test("APP-001: an order of 80 € has a total of 80 € (under the threshold)", () => {
  assert.equal(orderTotal(order([5000], [1500, 2])), 8000);
});

test("APP-001: an order of 100 € has a total of 90 € (threshold inclusive)", () => {
  assert.equal(orderTotal(order([10000])), 9000);
});

test("APP-001: an order of 120 € has a total of 108 €", () => {
  assert.equal(orderTotal(order([4000, 3])), 10800);
});

test("APP-001: an empty order has a total of 0 €", () => {
  assert.equal(orderTotal({ lines: [] }), 0);
});

test("APP-001: the discount applies once, on the raw subtotal, and recomputing gives the same result", () => {
  const o = order([6000], [6000]);
  const snapshot = structuredClone(o);
  assert.equal(orderTotal(o), 10800);
  assert.equal(orderTotal(o), 10800);
  assert.deepEqual(o, snapshot);
});

test("APP-001: boundaries are rounded half-up to the cent", () => {
  assert.equal(orderTotal(order([9999])), 9999);
  assert.equal(orderTotal(order([10001])), 9001);
  assert.equal(orderTotal(order([10005])), 9005);
});

test("APP-001: invalid inputs are rejected with an explicit error", () => {
  for (const bad of [null, undefined, 42, "order", {}, { lines: "x" }, { lines: [null] }, { lines: [7] }]) {
    assert.throws(() => orderTotal(bad), TypeError, `malformed order ${JSON.stringify(bad)}`);
  }
  for (const price of [12.5, Number.NaN, Number.POSITIVE_INFINITY, "100", undefined]) {
    assert.throws(() => orderTotal(order([price])), TypeError, `amount ${String(price)}`);
  }
  for (const quantity of [1.5, Number.NaN, "2", undefined]) {
    assert.throws(() => orderTotal({ lines: [{ unitPriceCents: 100, quantity }] }), TypeError, `quantity ${String(quantity)}`);
  }
  assert.throws(() => orderTotal(order([-1])), RangeError);
  assert.throws(() => orderTotal(order([100, 0])), RangeError);
  assert.throws(() => orderTotal(order([100, -2])), RangeError);
  assert.throws(() => orderTotal(order([Number.MAX_SAFE_INTEGER, 2])), RangeError);
});
