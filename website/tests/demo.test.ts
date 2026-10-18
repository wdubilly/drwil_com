import { describe, expect, it } from "vitest";
import { evaluate } from "../src/demo/model";
import { SCENARIOS, VARIANTS, type VariantId } from "../src/demo/scenarios";

const all = Object.keys(VARIANTS) as VariantId[];

describe("SITE-001: the demonstration never shows PASS over an unresolved obligation", () => {
  it("SITE-001: all-green is the only scenario that passes without human attestation", () => {
    expect(evaluate(VARIANTS["all-green"].def).status).toBe("PASS");
    expect(evaluate(VARIANTS["all-green"].def).exitCode).toBe(0);
  });

  it("SITE-001: a criterion with no durable proof makes the verdict FAIL", () => {
    for (const id of SCENARIOS.unproven) {
      const r = evaluate(VARIANTS[id].def);
      expect(r.status, id).toBe("FAIL");
      expect(r.exitCode).toBe(1);
      expect(r.criteria.some((c) => c.status !== "pass")).toBe(true);
    }
  });

  it("SITE-001: a check that did not run is ERROR, a pending human judgment is MANUAL", () => {
    expect(evaluate(VARIANTS["tool-missing"].def)).toMatchObject({ status: "ERROR", exitCode: 2 });
    expect(evaluate(VARIANTS["human-pending"].def)).toMatchObject({ status: "MANUAL", exitCode: 1 });
    expect(evaluate(VARIANTS["human-attested"].def)).toMatchObject({ status: "ATTESTED", exitCode: 0 });
  });

  it("SITE-001: a failed replayed check is FAIL and the terminal names the broken contract", () => {
    const r = evaluate(VARIANTS.regression.def);
    expect(r.status).toBe("FAIL");
    expect(r.lines.join("\n")).toContain("EXP-012");
  });

  it("SITE-001: every non-passing variant prints a non-PASS headline and consistent exit code", () => {
    for (const id of all) {
      const r = evaluate(VARIANTS[id].def);
      const ok = r.status === "PASS" || r.status === "ATTESTED";
      expect(r.headline.includes("PASS"), id).toBe(ok);
      expect(r.exitCode === 0, id).toBe(ok);
      expect(r.lines.at(-1)).toContain(`exit ${r.exitCode}`);
    }
  });

  it("SITE-001: an attestation never replaces a failed automated check", () => {
    const def = structuredClone(VARIANTS["human-attested"].def);
    def.checks[0]!.outcome = { kind: "failed", message: "boom", output: [] };
    def.contracts[0]!.manual = "judge";
    expect(evaluate(def).status).toBe("FAIL");
  });
});
