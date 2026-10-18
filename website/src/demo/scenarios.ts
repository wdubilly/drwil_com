import type { ScenarioDef } from "./model";

export type ScenarioId = "pass" | "unproven" | "unfinished";

export type VariantId =
  | "all-green"
  | "no-proof"
  | "unknown-proof"
  | "check-only"
  | "tool-missing"
  | "human-pending"
  | "human-attested"
  | "regression";

export interface Variant {
  id: VariantId;
  def: ScenarioDef;
}

const CRITERION = "An empty export must be refused";

const exportCheck = {
  id: "export-empty",
  command: 'node --test --test-name-pattern "EXP-012" "tests/*.test.mjs"',
  outcome: { kind: "ok" },
} as const;

const secretsOk = { id: "secrets", command: "gitleaks detect --no-banner", outcome: { kind: "ok" } } as const;

const exportContract = { id: "EXP-012", title: "An empty export is refused", checks: ["export-empty"] };
const secretsContract = { id: "SEC-007", title: "No secret in the repo", checks: ["secrets"] };

export const SCENARIOS: Record<ScenarioId, VariantId[]> = {
  pass: ["all-green"],
  unproven: ["no-proof", "unknown-proof", "check-only"],
  unfinished: ["tool-missing", "human-pending", "human-attested"],
};

export const VARIANTS: Record<VariantId, Variant> = {
  "all-green": {
    id: "all-green",
    def: {
      contracts: [exportContract, secretsContract],
      checks: [exportCheck, secretsOk],
      criteria: [{ text: CRITERION, link: "EXP-012", human: false }],
    },
  },
  "no-proof": {
    id: "no-proof",
    def: {
      contracts: [exportContract, secretsContract],
      checks: [exportCheck, secretsOk],
      criteria: [{ text: CRITERION, link: null, human: false }],
    },
  },
  "unknown-proof": {
    id: "unknown-proof",
    def: {
      contracts: [exportContract, secretsContract],
      checks: [exportCheck, secretsOk],
      criteria: [{ text: CRITERION, link: "EXP-099", human: false }],
    },
  },
  "check-only": {
    id: "check-only",
    def: {
      contracts: [exportContract, secretsContract],
      checks: [exportCheck, secretsOk],
      // The brief cites the check, not the contract that owns it: a check alone is not a durable proof.
      criteria: [{ text: CRITERION, link: "export-empty", human: false }],
    },
  },
  "tool-missing": {
    id: "tool-missing",
    def: {
      contracts: [exportContract, secretsContract],
      checks: [exportCheck, { id: "secrets", command: "gitleaks detect --no-banner", outcome: { kind: "not-run", detail: "gitleaks not found" } }],
      criteria: [{ text: CRITERION, link: "EXP-012", human: false }],
    },
  },
  "human-pending": {
    id: "human-pending",
    def: {
      contracts: [exportContract, { id: "EXP-020", title: "The refusal message reads clearly", checks: [], manual: "the requester judges the wording" }],
      checks: [exportCheck],
      criteria: [
        { text: CRITERION, link: "EXP-012", human: false },
        { text: "The refusal message reads clearly", link: "EXP-020", human: true },
      ],
    },
  },
  "human-attested": {
    id: "human-attested",
    def: {
      contracts: [
        exportContract,
        {
          id: "EXP-020",
          title: "The refusal message reads clearly",
          checks: [],
          manual: "the requester judges the wording",
          attestation: { on: "2026-10-18", by: "the requester" },
        },
      ],
      checks: [exportCheck],
      criteria: [
        { text: CRITERION, link: "EXP-012", human: false },
        { text: "The refusal message reads clearly", link: "EXP-020", human: true },
      ],
    },
  },
  regression: {
    id: "regression",
    def: {
      contracts: [exportContract],
      checks: [
        {
          id: "export-empty",
          command: 'node --test --test-name-pattern "EXP-012" "tests/*.test.mjs"',
          outcome: {
            kind: "failed",
            message: "expected an error, received an empty file",
            output: ["✖ EXP-012: an empty export is refused", "  AssertionError: expected exportRows([]) to throw"],
          },
        },
      ],
      criteria: [{ text: CRITERION, link: "EXP-012", human: false }],
    },
  },
};
