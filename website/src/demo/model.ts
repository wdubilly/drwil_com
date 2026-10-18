// Illustrative model of `drwil verify`: it mirrors the documented rules (priority FAIL > ERROR >
// MANUAL > PASS, exit codes 0/1/2, criterion judgement against the contracts) on SAMPLE data.
// It never runs the CLI.

export type Status = "PASS" | "ATTESTED" | "FAIL" | "MANUAL" | "ERROR";

export type CriterionStatus = "pass" | "no-proof" | "unknown-proof" | "not-durable" | "no-contract" | "not-pass";

export type CheckOutcome =
  | { kind: "ok" }
  | { kind: "failed"; message: string; output: string[] }
  | { kind: "not-run"; detail: string };

export interface CheckDef {
  id: string;
  command: string;
  outcome: CheckOutcome;
}

export interface ContractDef {
  id: string;
  title: string;
  checks: string[];
  /** The part of the proof only a human can judge. */
  manual?: string;
  attestation?: { on: string; by: string };
}

export interface CriterionDef {
  text: string;
  /** What the brief cites as proof: a contract ID, or nothing. */
  link: string | null;
  human: boolean;
}

export interface ScenarioDef {
  contracts: ContractDef[];
  checks: CheckDef[];
  criteria: CriterionDef[];
}

export interface ContractResult {
  id: string;
  title: string;
  status: Status;
  reasons: string[];
}

export interface CriterionResult extends CriterionDef {
  status: CriterionStatus;
  proof: string | null;
}

export interface EvidenceRecord {
  control: string;
  command: string;
  result: "ok" | "failed" | "not run";
  exit: string;
  detail: string;
}

export interface Report {
  contracts: ContractResult[];
  criteria: CriterionResult[];
  status: Status;
  exitCode: 0 | 1 | 2;
  headline: string;
  counts: Record<Status, number>;
  lines: string[];
  evidence: EvidenceRecord[];
}

const HEADLINES: Record<Status, string> = {
  PASS: "GOVERNANCE: PASS",
  ATTESTED: "GOVERNANCE: PASS",
  FAIL: "GOVERNANCE: FAIL",
  MANUAL: "GOVERNANCE: MANUAL REVIEW REQUIRED",
  ERROR: "GOVERNANCE: VERIFY ERROR",
};

const SYMBOLS: Record<Status, string> = { PASS: "✓", ATTESTED: "◆", FAIL: "✗", MANUAL: "?", ERROR: "!" };
const EXIT_CODES: Record<Status, 0 | 1 | 2> = { PASS: 0, ATTESTED: 0, FAIL: 1, MANUAL: 1, ERROR: 2 };

/** FAIL wins (a failure is established), then ERROR (no verdict can be established), then MANUAL. */
export function worst(statuses: Status[]): Status {
  for (const s of ["FAIL", "ERROR", "MANUAL"] as const) if (statuses.includes(s)) return s;
  return statuses.includes("ATTESTED") ? "ATTESTED" : "PASS";
}

function evaluateContract(def: ContractDef, checks: Map<string, CheckDef>): ContractResult {
  const reasons: string[] = [];
  const statuses: Status[] = [];
  let allOk = true;
  for (const id of def.checks) {
    const check = checks.get(id);
    if (!check) continue;
    const { outcome } = check;
    if (outcome.kind === "ok") reasons.push(`${id}: ok (automated)`);
    else if (outcome.kind === "failed") {
      allOk = false;
      statuses.push("FAIL");
      reasons.push(`${id}: failed — ${outcome.message}`);
      for (const line of outcome.output) reasons.push(`  │ ${line}`);
    } else {
      allOk = false;
      statuses.push("ERROR");
      reasons.push(`${id}: not run (${outcome.detail})`);
    }
  }
  if (def.manual) {
    statuses.push("MANUAL");
    reasons.push(`human required: ${def.manual}`);
  }
  let status = worst(statuses);
  // An attestation never replaces an automated proof that failed or did not run.
  if (status === "MANUAL" && allOk && def.attestation) {
    status = "ATTESTED";
    reasons.push(`attested on ${def.attestation.on} by ${def.attestation.by}`);
  }
  return { id: def.id, title: def.title, status, reasons };
}

function evaluateCriterion(c: CriterionDef, contracts: ContractDef[], results: ContractResult[]): CriterionResult {
  const make = (status: CriterionStatus, proof: string | null = null): CriterionResult => ({ ...c, status, proof });
  if (!c.link) return make("no-proof");
  const contract = results.find((r) => r.id === c.link);
  if (contract) {
    const def = contracts.find((k) => k.id === c.link);
    const human = Boolean(def?.manual) || def?.checks.length === 0;
    const proof = contract.status.toLowerCase();
    if (human !== c.human) return make("not-durable", proof);
    return make(proof === "pass" || proof === "attested" ? "pass" : "not-pass", proof);
  }
  const check = contracts.flatMap((k) => k.checks).find((id) => id === c.link);
  if (!check || c.human) return make("unknown-proof");
  return make("no-contract");
}

/** An open criterion is MANUAL only when every open one waits for a human; otherwise it is a FAIL. */
function criteriaVerdict(criteria: CriterionResult[]): Status | null {
  const open = criteria.filter((c) => c.status !== "pass");
  if (open.length === 0) return null;
  return open.every((c) => c.human && c.status === "not-pass" && c.proof === "manual") ? "MANUAL" : "FAIL";
}

export function evaluate(def: ScenarioDef): Report {
  const checks = new Map(def.checks.map((c) => [c.id, c]));
  const contracts = def.contracts.map((c) => evaluateContract(c, checks));
  const criteria = def.criteria.map((c) => evaluateCriterion(c, def.contracts, contracts));
  const fromCriteria = criteriaVerdict(criteria);
  const status = worst([...contracts.map((c) => c.status), ...(fromCriteria ? [fromCriteria] : [])]);
  const counts: Record<Status, number> = { PASS: 0, ATTESTED: 0, FAIL: 0, MANUAL: 0, ERROR: 0 };
  for (const c of contracts) counts[c.status] += 1;

  const lines = ["$ npx drwil verify", "", "Contracts"];
  for (const c of contracts) {
    lines.push(`  ${SYMBOLS[c.status]} ${c.status.padEnd(6)} ${c.id.padEnd(8)} ${c.title}`);
    for (const r of c.reasons) lines.push(`             ${r}`);
  }
  lines.push("");
  const open = criteria.filter((c) => c.status !== "pass");
  if (open.length) {
    lines.push(
      `Unproven acceptance criteria of the active brief (verdict and closing): ${open
        .map((c) => `« ${c.text} » (${c.status})`)
        .join(", ")}`,
    );
  }
  lines.push(
    `${contracts.length} contracts: ${counts.PASS} PASS, ${counts.ATTESTED} ATTESTED, ${counts.FAIL} FAIL, ${counts.MANUAL} MANUAL, ${counts.ERROR} ERROR`,
  );
  lines.push(`${HEADLINES[status]}`.padEnd(60) + `(exit ${EXIT_CODES[status]})`);

  const evidence = def.checks.map<EvidenceRecord>((c) => ({
    control: c.id,
    command: c.command,
    result: c.outcome.kind === "ok" ? "ok" : c.outcome.kind === "failed" ? "failed" : "not run",
    exit: c.outcome.kind === "ok" ? "0" : c.outcome.kind === "failed" ? "1" : "—",
    detail: c.outcome.kind === "ok" ? "ran and passed" : c.outcome.kind === "failed" ? c.outcome.message : c.outcome.detail,
  }));

  return { contracts, criteria, status, exitCode: EXIT_CODES[status], headline: HEADLINES[status], counts, lines, evidence };
}
