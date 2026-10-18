export type Lang = "en" | "fr";

export interface Stage {
  name: string;
  text: string;
}

export interface WorkflowStage extends Stage {
  role: string;
  artifact: string;
}

export interface Verdict {
  name: string;
  meaning: string;
  shape: string;
}

export interface Dict {
  meta: { title: string; description: string };
  nav: { label: string; links: { chain: string; demo: string; workflow: string; regression: string; verdicts: string; boundaries: string; install: string }; github: string; language: string; skip: string };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    sceneLabel: string;
    sceneNote: string;
    legend: { requirements: string; contracts: string; checks: string; evidence: string; verdict: string };
    verdictWord: { PASS: string; FAIL: string; MANUAL: string };
    points: string[];
  };
  chain: { title: string; lead: string; caution: string; stages: Stage[] };
  demo: {
    title: string;
    lead: string;
    badge: string;
    scenarioLabel: string;
    variantLabel: string;
    scenarios: { pass: string; unproven: string; unfinished: string };
    variants: {
      "all-green": string;
      "no-proof": string;
      "unknown-proof": string;
      "check-only": string;
      "tool-missing": string;
      "human-pending": string;
      "human-attested": string;
    };
    why: {
      "all-green": string;
      "no-proof": string;
      "unknown-proof": string;
      "check-only": string;
      "tool-missing": string;
      "human-pending": string;
      "human-attested": string;
    };
    panels: { criterion: string; contract: string; checks: string; evidence: string; verdict: string; terminal: string };
    criterionStatus: {
      pass: string;
      "no-proof": string;
      "unknown-proof": string;
      "not-durable": string;
      "no-contract": string;
      "not-pass": string;
    };
    table: { criterion: string; proof: string; verdict: string; none: string };
    evidenceCols: { control: string; command: string; result: string; exit: string };
    results: { ok: string; failed: string; "not run": string };
    exitLabel: string;
    attestButton: string;
    attestNote: string;
    resetButton: string;
    sample: string;
    errorVsManual: string;
  };
  workflow: {
    title: string;
    lead: string;
    listLabel: string;
    stages: WorkflowStage[];
    artifactLabel: string;
    roles: { agent: string; drwil: string; human: string; agentText: string; drwilText: string; humanText: string };
    loopsTitle: string;
    loops: Stage[];
    humanTitle: string;
    humanGates: string[];
    stateNote: string;
  };
  regression: {
    title: string;
    quote: string;
    lead: string;
    before: string;
    after: string;
    beforeText: string;
    afterText: string;
    steps: string[];
    note: string;
    sample: string;
  };
  verdicts: { title: string; lead: string; items: Verdict[]; rule: string; priority: string; exit: string };
  boundaries: { title: string; lead: string; doesTitle: string; does: string[]; doesNotTitle: string; doesNot: string[] };
  install: { title: string; lead: string; prerequisites: string; steps: { title: string; text: string; code: string }[]; note: string; copy: string; copied: string };
  final: { title: string; text: string; cta: string };
  footer: { text: string; links: { repo: string; readme: string; install: string; issues: string; license: string } };
}

export const en: Dict = {
  meta: {
    title: "DRWIL — The agent produces the work. DRWIL demands the proof.",
    description:
      "DRWIL is an open-source governance and verification CLI for AI-generated work: declared requirements, contracts, checks, evidence and a deterministic verdict.",
  },
  nav: {
    label: "Main navigation",
    links: {
      chain: "Model",
      demo: "Demo",
      workflow: "Workflow",
      regression: "Regression",
      verdicts: "Verdicts",
      boundaries: "Limits",
      install: "Install",
    },
    github: "GitHub",
    language: "Language",
    skip: "Skip to content",
  },
  hero: {
    eyebrow: "GOVERNANCE FOR AGENT-PRODUCED WORK",
    line1: "The agent produces the work.",
    line2: "DRWIL demands the proof.",
    lead: "AI agents can write the code. DRWIL helps verify whether the declared requirements and contracts are actually satisfied, with evidence you can inspect.",
    ctaPrimary: "Explore DRWIL on GitHub",
    ctaSecondary: "See how verification works",
    sceneLabel: "Diagram: requirements, contracts, checks and evidence flow into a verification core that returns a verdict.",
    sceneNote: "Illustration of the model, not a live engine.",
    legend: {
      requirements: "Requirements",
      contracts: "Contracts",
      checks: "Checks",
      evidence: "Evidence",
      verdict: "Verdict",
    },
    verdictWord: { PASS: "PASS", FAIL: "FAIL", MANUAL: "MANUAL" },
    points: [
      "AI-generated work can look complete without being adequately proven.",
      "DRWIL connects declared requirements to contracts, checks, evidence and a verdict.",
      "A validated behavior stays testable, so a later change can expose a regression.",
    ],
  },
  chain: {
    title: "From intent to evidence.",
    lead: "Six links turn a human decision into something a machine can answer for.",
    caution:
      "This is a governance model, not a claim that DRWIL writes every test or discovers every missing requirement. People and agents still write the criteria, the contracts and the checks.",
    stages: [
      { name: "Human intent", text: "A person decides what must be true: the need, its limits, its risks. DRWIL does not invent it." },
      {
        name: "Acceptance criteria",
        text: "Each criterion of the active brief states one business-level outcome and cites the contract that proves it. A criterion without a durable proof is reported, never ignored.",
      },
      {
        name: "Contracts",
        text: "A contract declares an obligation that must hold: a rule, a reason, and either a check or a part that only a human can judge.",
      },
      {
        name: "Executable checks",
        text: "A check is the mechanism that evaluates an obligation: a test, a scan, a script the project declares. Its quality stays the team's responsibility.",
      },
      {
        name: "Evidence",
        text: "What actually ran: the control, the command result, the exit status, the relevant output. Sensitive values are masked where appropriate.",
      },
      { name: "Verdict", text: "PASS, FAIL, ERROR, MANUAL or ATTESTED, with a deterministic exit code. The agent does not grade itself." },
    ],
  },
  demo: {
    title: "Try the verdict.",
    lead: "Pick a scenario. The criterion, the contract, the checks, the evidence and the verdict change together.",
    badge: "Illustrative demonstration — sample data",
    scenarioLabel: "Scenario",
    variantLabel: "Case",
    sample:
      "This is a simulation on sample data. It does not run your local CLI and is not connected to a live DRWIL engine.",
    scenarios: {
      pass: "A — All required checks pass",
      unproven: "B — A criterion has no durable proof",
      unfinished: "C — Verification cannot be completed",
    },
    variants: {
      "all-green": "Linked contract, passing check",
      "no-proof": "No proof cited",
      "unknown-proof": "Proof unknown to the registry",
      "check-only": "A check, but no contract",
      "tool-missing": "A required tool is missing",
      "human-pending": "Human judgment pending",
      "human-attested": "Human has attested",
    },
    why: {
      "all-green":
        "The criterion cites a contract, the contract runs a check, the check passed. Every blocking obligation is proven: PASS.",
      "no-proof":
        "All checks are green, yet the criterion cites no proof. A green pipeline is not a proven requirement: the work cannot be treated as verified, so the verdict is FAIL.",
      "unknown-proof":
        "The criterion cites EXP-099, which does not exist in the contract registry. A proof that cannot be found is not a proof: FAIL.",
      "check-only":
        "The criterion points at a check, not at the contract that owns it. A check alone is not a durable obligation: FAIL until a contract carries it.",
      "tool-missing":
        "A required check could not run, so no result exists. That is an ERROR, a technical verification problem, not a failure of the work and never a pass.",
      "human-pending":
        "Everything mechanical passed, but one criterion needs a human judgment that has not happened yet. That is MANUAL: pending, not failed, not passed.",
      "human-attested":
        "A human reviewed the wording and attested it, in their own terminal. The remaining human-verifiable part is recorded, so the verdict can pass as ATTESTED.",
    },
    panels: {
      criterion: "Acceptance criterion",
      contract: "Contract",
      checks: "Checks",
      evidence: "Evidence",
      verdict: "Verdict",
      terminal: "drwil verify (sample output)",
    },
    criterionStatus: {
      pass: "proven",
      "no-proof": "no proof",
      "unknown-proof": "proof unknown to the registry",
      "not-durable": "proof not durable",
      "no-contract": "check without a contract",
      "not-pass": "proof not passing",
    },
    table: { criterion: "Criterion", proof: "Cites", verdict: "Judgement", none: "nothing" },
    evidenceCols: { control: "Control", command: "Command", result: "Result", exit: "Exit" },
    results: { ok: "ok", failed: "failed", "not run": "not run" },
    exitLabel: "Exit code",
    attestButton: "Simulate human attestation",
    attestNote: "In the real CLI this is drwil attest, typed by a human in an interactive terminal. An agent cannot do it.",
    resetButton: "Back to pending",
    errorVsManual:
      "ERROR means verification itself could not be established (tooling, configuration). MANUAL means the mechanical part is done and a human judgment is still owed.",
  },
  workflow: {
    title: "Seven stages, three responsibilities.",
    lead: "Work moves through activities kept in a local state on disk. Select a stage to see what happens and what it leaves behind.",
    listLabel: "Workflow stages",
    artifactLabel: "Illustrative artifact",
    stages: [
      {
        name: "SCOPING",
        text: "Define the need, the boundaries and the project context. Read, analyse, frame: no code is modified yet.",
        role: "Human decides, agent helps frame",
        artifact: "<!-- scope\nfiles:\n  - src/export/*\n-->",
      },
      {
        name: "EXPECTATION",
        text: "Formalize what must be true: each acceptance criterion points to the contract that will prove it.",
        role: "Human approves the criteria",
        artifact: "## Acceptance criteria\n- An empty export is refused — `EXP-012`",
      },
      {
        name: "REQUEST",
        text: "Clarify the work to perform before any code is written.",
        role: "Human and agent",
        artifact: "$ node .githooks/state.mjs\nActivity: REQUEST",
      },
      {
        name: "BUILD",
        text: "The agent implements inside the declared scope. Hooks and CI replay the checks on every commit.",
        role: "Agent builds",
        artifact: "Drwil-Brief: docs/projects/export.md",
      },
      {
        name: "EVIDENCE",
        text: "Run the relevant business tests and collect the results as inspectable evidence.",
        role: "Agent runs, DRWIL records",
        artifact: "$ npx drwil verify --evidence",
      },
      {
        name: "VERIFY",
        text: "DRWIL evaluates the declared contracts and the brief's acceptance criteria. A failed verification sends the work back to BUILD.",
        role: "DRWIL evaluates",
        artifact: "✗ FAIL   EXP-012  An empty export is refused",
      },
      {
        name: "CLOSING",
        text: "Closing requires PASS or ATTESTED on the current commit. The brief is condensed into a journal, untreated limits become intents, the pull request is opened.",
        role: "Human accepts and merges",
        artifact: "GOVERNANCE: PASS                       (exit 0)",
      },
    ],
    roles: {
      agent: "The agent",
      drwil: "DRWIL",
      human: "The human",
      agentText: "builds the work, runs the available checks and produces evidence.",
      drwilText: "evaluates the declared obligations and returns a deterministic verdict.",
      humanText: "decides, attests what a machine cannot judge, and stays responsible.",
    },
    loopsTitle: "The loops",
    loops: [
      { name: "Commit loop", text: "Hooks run the checks, the scope gate and the brief trailer before a commit is accepted." },
      { name: "Push and CI loop", text: "Pre-push and CI replay the checks. Effective enforcement depends on the CI and the repository rules." },
      { name: "Verify loop", text: "A failed VERIFY returns to BUILD. Fix, collect evidence, verify again." },
      { name: "Attestation loop", text: "A MANUAL contract waits for a human attestation, then verification is run again." },
      { name: "Queue loop", text: "Several ready briefs can be chained, stopping at the first human gate." },
    ],
    humanTitle: "Where the human stays in the loop",
    humanGates: [
      "Frames the need and approves the acceptance criteria.",
      "Starts the workstream: an agent cannot start work by itself.",
      "Attests a MANUAL contract: an agent cannot attest its own work.",
      "Accepts and merges, unless the merge was authorised at start.",
    ],
    stateNote:
      "The state file records the current activity locally. It is workflow state, not a complete audit log of every agent action.",
  },
  regression: {
    title: "Non-regression.",
    quote: "A saved PASS is history. A replayable test is protection against regression.",
    lead: "Each acceptance criterion is proven by a contract with a replayable check. Once validated, the behavior stays protected in every later workstream.",
    before: "Before the change",
    after: "After a later change",
    beforeText: "The check for EXP-012 passes. The criterion is proven.",
    afterText: "A later implementation breaks the behavior. The same check is replayed: it fails, and the verdict names the broken obligation.",
    steps: ["Validated behavior", "Later change", "Same test replayed", "Broken obligation identified"],
    note: "An old result alone does not prove the current code still passes. Keeping the test and its link to a contract is what makes it reusable.",
    sample: "Sample data. This page does not execute tests.",
  },
  verdicts: {
    title: "Five verdicts. No silent success.",
    lead: "Each state has a precise meaning and its own shape, so it never relies on color alone.",
    items: [
      { name: "PASS", meaning: "The required declared obligations are proven.", shape: "check mark" },
      { name: "FAIL", meaning: "A check or an acceptance criterion is not satisfied.", shape: "cross" },
      { name: "ERROR", meaning: "Verification could not establish the result: configuration, tooling or execution problem.", shape: "exclamation" },
      { name: "MANUAL", meaning: "A human judgment or validation is still required.", shape: "question mark" },
      { name: "ATTESTED", meaning: "A human attestation has been recorded and still covers the contract.", shape: "diamond" },
    ],
    rule: "Not checked does not mean passed.",
    priority: "When results differ, FAIL wins over ERROR, ERROR over MANUAL, MANUAL over PASS. MANUAL is never silently converted into PASS.",
    exit: "Exit codes: 0 when blocking contracts PASS or are ATTESTED, 1 on FAIL or MANUAL, 2 on ERROR.",
  },
  boundaries: {
    title: "What DRWIL does, and does not.",
    lead: "A verification tool should be honest about its own limits.",
    doesTitle: "It does",
    does: [
      "Provide a local, agent-agnostic workflow.",
      "Check declared contracts through configured controls.",
      "Evaluate the acceptance criteria of the active brief.",
      "Produce inspectable verification results and evidence.",
      "Support explicit human attestation where appropriate.",
      "Integrate with Git hooks and supported CI workflows.",
    ],
    doesNotTitle: "It does not",
    doesNot: [
      "Replace the developer or the AI coding agent.",
      "Guarantee that an incomplete or badly designed specification captures every requirement.",
      "Prove the quality of a check merely because the check exists.",
      "Prevent a merge unless the hosting platform is configured to enforce the checks.",
      "Stop someone with enough repository access from bypassing a local hook.",
      "Turn its local workflow state into a complete, tamper-proof audit trail.",
    ],
  },
  install: {
    title: "Try it on a project.",
    lead: "DRWIL is not published on npm yet: install it from a GitHub release.",
    prerequisites: "Requires Node.js 22+ and git.",
    steps: [
      { title: "Install as a dev dependency", text: "From your project folder.", code: "" },
      { title: "Preview, then set up", text: "Nothing is written by the dry run.", code: "npx drwil init --dry-run\nnpx drwil init" },
      {
        title: "Verify",
        text: "Without a CI configured, a VERIFY ERROR is expected: a check that did not run never counts as passed.",
        code: "npx drwil doctor\nnpx drwil verify",
      },
    ],
    note: "Always check the README for the current installation instructions.",
    copy: "Copy",
    copied: "Copied",
  },
  final: {
    title: "Make declared obligations answerable to evidence.",
    text: "AI can produce the code. DRWIL makes the declared obligations answerable to evidence.",
    cta: "Explore DRWIL on GitHub",
  },
  footer: {
    text: "DRWIL is open source. This website presents the current command-line tool; it is not a hosted product.",
    links: { repo: "Repository", readme: "README", install: "Installation", issues: "Issues", license: "License" },
  },
};
