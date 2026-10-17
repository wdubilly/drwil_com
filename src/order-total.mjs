// Total of an order (APP-001, docs/contracts.md). Amounts are integer cents so
// that no floating-point error can creep into a price.

export const DISCOUNT_THRESHOLD_CENTS = 10_000;

/**
 * Total in cents of `order` = { lines: [{ unitPriceCents, quantity }] }:
 * subtotal of the lines, minus 10 % when the subtotal is at least 100 €,
 * rounded half-up to the cent. Throws TypeError on a malformed input and
 * RangeError on an out-of-range value; never mutates `order`.
 */
export function orderTotal(order) {
  if (order === null || typeof order !== "object" || !Array.isArray(order.lines)) {
    throw new TypeError("order must be an object with a lines array");
  }
  let subtotal = 0;
  order.lines.forEach((line, i) => {
    if (line === null || typeof line !== "object") {
      throw new TypeError(`line ${i} must be an object`);
    }
    const { unitPriceCents, quantity } = line;
    if (!Number.isSafeInteger(unitPriceCents)) {
      throw new TypeError(`line ${i}: unitPriceCents must be an integer number of cents`);
    }
    if (unitPriceCents < 0) throw new RangeError(`line ${i}: unitPriceCents must not be negative`);
    if (!Number.isSafeInteger(quantity)) throw new TypeError(`line ${i}: quantity must be an integer`);
    if (quantity < 1) throw new RangeError(`line ${i}: quantity must be at least 1`);
    subtotal += unitPriceCents * quantity;
  });
  if (!Number.isSafeInteger(subtotal)) throw new RangeError("order subtotal is too large");
  if (subtotal < DISCOUNT_THRESHOLD_CENTS) return subtotal;
  // 90 % rounded half-up, in integers: floor((9 × subtotal + 5) / 10).
  return Math.floor((subtotal * 9 + 5) / 10);
}
