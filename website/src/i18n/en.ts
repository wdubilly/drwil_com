export type Lang = "en" | "fr";

export interface Stage {
  name: string;
  text: string;
}

export interface WorkflowStage extends Stage {
  role: string;
  artifact: string;
}

export type Actor = "human" | "agent" | "drwil";

export interface AdoptStep {
  who: Actor;
  title: string;
  text: string;
  code?: string;
}

export interface AdoptCase {
  name: string;
  intro: string;
  steps: AdoptStep[];
}

export interface CommandEntry {
  cmd: string;
  text: string;
}

export interface MapNodeText {
  name: string;
  role: string;
}

export interface MapBenefit {
  title: string;
  text: string;
  nodes: string[];
}

export interface MapLensText {
  name: string;
  intro: string;
  items: MapBenefit[];
}

export interface Verdict {
  name: string;
  meaning: string;
  shape: string;
}

export interface Dict {
  meta: { title: string; description: string };
  nav: { label: string; links: { chain: string; demo: string; map: string; workflow: string; adopt: string; commands: string; regression: string; verdicts: string; boundaries: string; install: string }; github: string; language: string; skip: string };
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
  map: {
    title: string;
    lead: string;
    hint: string;
    svgLabel: string;
    allLabel: string;
    lensLabel: string;
    benefitsLabel: string;
    groups: Record<"actors" | "install" | "optional" | "kit" | "guards" | "proof" | "closing", string>;
    selectedLabel: string;
    nothingSelected: string;
    whereLabel: string;
    inLabel: string;
    outLabel: string;
    clear: string;
    nodes: Record<string, MapNodeText>;
    lenses: Record<"dev" | "quality" | "org", MapLensText>;
  };
  adopt: { title: string; lead: string; listLabel: string; actors: Record<Actor, string>; cases: AdoptCase[]; note: string };
  commands: { title: string; lead: string; cliTitle: string; cli: CommandEntry[]; slashTitle: string; slashNote: string; slash: CommandEntry[]; note: string };
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
      map: "Map",
      workflow: "Workflow",
      adopt: "Adopt",
      commands: "Commands",
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
  map: {
    title: "The whole system, and what it brings.",
    lead: "Click a component to see its role and what it connects to. Pick a lens (development, quality, organisation) to see which parts deliver each benefit.",
    hint: "Keyboard: Tab to a component, Enter to select. Solid links are flows, dashed links are installation or guidance.",
    svgLabel: "Interactive map of DRWIL components and their links",
    allLabel: "Everything",
    lensLabel: "Lens",
    benefitsLabel: "What it brings",
    groups: {
      actors: "People and agents",
      install: "Installation",
      optional: "Optional modules",
      kit: "Kit in your project",
      guards: "Guardrail layers",
      proof: "Verdict and proof",
      closing: "Closing",
    },
    selectedLabel: "Selected component",
    nothingSelected: "Select a component on the map to read its role.",
    whereLabel: "Where",
    inLabel: "Receives from",
    outLabel: "Feeds",
    clear: "Clear selection",
    nodes: {
      human: { name: "You (the human)", role: "Frame the need, approve briefs and criteria, start workstreams, attest manual contracts and merge." },
      agent: { name: "AI agent", role: "Codes inside the brief's scope and runs the verification. It never attests its own work." },
      cli: { name: "drwil CLI", role: "The entry point: init, verify, attest, doctor, contracts, state." },
      init: { name: "init / dry-run", role: "Detects the stack, layers, tools and CI, installs the kit, previews with --dry-run and never overwrites project files." },
      upkeep: { name: "doctor, drift, uninstall", role: "Diagnoses the installation, resolves drift in the kit mechanics with a backup, removes the kit from its manifest." },
      dashboard: { name: "Dashboard", role: "Optional module: a static view of progress and contract coverage." },
      frontq: { name: "Front quality", role: "Optional module: checks for front-end quality, such as contrast." },
      release: { name: "Release", role: "Optional module: a Git tag and a GitHub release note on the latest merged workstream." },
      agents: { name: "AGENTS.md", role: "A single entry point for Claude, Copilot, Cursor, Codex and Gemini. Tool-specific files only point back to it." },
      registry: { name: "Contracts registry", role: "docs/contracts.md is the single source of invariants: the shipped contracts plus a catalog to adopt from." },
      briefs: { name: "Briefs and intentions", role: "Each workstream has a scope block, acceptance criteria and a status that lets anyone resume it cold." },
      recipes: { name: "Recipes and skills", role: "Procedures written once as recipes, with slash-command shortcuts for the agent." },
      state: { name: "Workstream state", role: "A local state machine: SCOPING, BUILD, EVIDENCE, VERIFY, CLOSING." },
      glossary: { name: "Readable references", role: "Turns a contract ID into its label so reports stay legible to a human." },
      agenthooks: { name: "Agent hooks", role: "Claude Code hooks: state reminder, scope guard, refusal of --no-verify, ID glossing in replies." },
      precommit: { name: "pre-commit hooks", role: "Run the checks at every commit and add the brief's trailer to the commit message." },
      prepush: { name: "pre-push", role: "A full replay before the code leaves the machine." },
      ci: { name: "CI", role: "Replays each commit against its brief, on GitHub Actions or GitLab." },
      engine: { name: "Checks engine", role: "The shared engine behind the hooks and the CI: scope gate, docs check, contract checks." },
      verify: { name: "drwil verify", role: "Replays the checks and compares the result to the brief's acceptance criteria." },
      verdict: { name: "Verdict", role: "PASS, FAIL, ERROR, MANUAL or ATTESTED, with exit codes 0, 1 and 2." },
      evidence: { name: "Evidence", role: "Recorded proof, with secrets redacted. A PASS or ATTESTED on HEAD is required to close." },
      attest: { name: "drwil attest", role: "A human-only action, in an interactive terminal, tied to the contract's current text." },
      attfiles: { name: "Attestations", role: "Versioned attestation files that verify reads back." },
      agentout: { name: "Agent output", role: "verify --agent and --json: a machine-readable result with a next-step line." },
      journal: { name: "Journal and intents", role: "Each limit left untreated becomes an intent brief, so nothing is silently dropped." },
      usage: { name: "Token usage", role: "Tokens consumed per workstream, recorded in a file." },
      pr: { name: "Pull request", role: "Closes the workstream. The merge is a human decision, or authorised at start." },
      queue: { name: "Workstream queue", role: "Several briefs run one after another; the next starts only once the previous PR is merged." },
    },
    lenses: {
      dev: {
        name: "Development",
        intro: "What changes for the people and agents writing the code.",
        items: [
          { title: "One entry point for every AI tool", text: "The rules live in AGENTS.md and recipes; each tool's own file just points to them, so switching tool does not mean rewriting rules.", nodes: ["agents", "recipes"] },
          { title: "Work stays inside its scope", text: "A brief declares the files it may touch; hooks and the checks engine flag a change outside it.", nodes: ["briefs", "agenthooks", "engine"] },
          { title: "Feedback at commit, push and CI", text: "The same engine runs at each step, so a problem is found where it is cheapest to fix.", nodes: ["precommit", "prepush", "ci", "engine"] },
          { title: "A verdict an agent can act on", text: "verify --agent returns a machine-readable result with a next step, instead of free text to interpret.", nodes: ["verify", "agentout", "verdict"] },
          { title: "Safe installation and upkeep", text: "A dry run previews everything; project files are never overwritten; drift is resolved with a diff and a backup.", nodes: ["init", "upkeep", "cli"] },
        ],
      },
      quality: {
        name: "Quality",
        intro: "What makes a claim of quality checkable. Limit: local hooks can be bypassed by someone with repository access; the CI replay is the backstop.",
        items: [
          { title: "Invariants written once", text: "Each rule is a contract with its source of truth and its proof, instead of a habit.", nodes: ["registry"] },
          { title: "Criteria tied to checks", text: "Every acceptance criterion points to the contract that proves it, and verify replays them.", nodes: ["briefs", "registry", "verify"] },
          { title: "A check that did not run is not a pass", text: "A missing proof gives a VERIFY ERROR, never a silent PASS.", nodes: ["verdict", "verify"] },
          { title: "Evidence required to close", text: "A workstream closes only with a PASS or ATTESTED on the current commit.", nodes: ["evidence", "state", "verdict"] },
          { title: "Human judgement is explicit", text: "What cannot be automated is a MANUAL contract that a human attests; the agent cannot do it for them.", nodes: ["attest", "attfiles", "human"] },
        ],
      },
      org: {
        name: "Organisation",
        intro: "What it changes for teams, decisions and follow-up.",
        items: [
          { title: "Decisions stay human", text: "Framing, approval, starting, attesting and merging are human gestures; the agent proposes and builds.", nodes: ["human", "attest", "pr", "state"] },
          { title: "Projects resumable cold", text: "Briefs carry scope, status and hand-off, so another person or agent can pick the work back up.", nodes: ["briefs", "journal"] },
          { title: "Nothing silently dropped", text: "Limits left untreated become intent briefs at closing.", nodes: ["journal", "briefs"] },
          { title: "Reports a human can read", text: "Contract IDs come with their label, so a reviewer does not need to know the registry by heart.", nodes: ["glossary", "registry"] },
          { title: "Cost and flow visibility", text: "Tokens are recorded per workstream, and several briefs can run as a queue, one at a time after each merge.", nodes: ["usage", "queue", "dashboard"] },
        ],
      },
    },
  },
  adopt: {
    title: "Adopt DRWIL, step by step.",
    lead: "Two starting points, one path: choose the one that matches your project. Each step says who acts: you, your AI agent, or the DRWIL tool.",
    listLabel: "Starting point",
    actors: { human: "You", agent: "AI agent", drwil: "DRWIL" },
    cases: [
      {
        name: "Empty project",
        intro: "Nothing exists yet: no code, no stack. The need is framed first, then the kit is made live.",
        steps: [
          { who: "human", title: "Create the project and install", text: "A folder with a package.json, then the dev dependency from the Install section.", code: "mkdir my-app && cd my-app\nnpm init -y" },
          { who: "drwil", title: "Preview, then initialise", text: "The dry run writes nothing. With no code yet, declare the layers yourself and describe the application.", code: "npx drwil init --dry-run\nnpx drwil init --description \"What the app does\" --layers backend,frontend" },
          { who: "agent", title: "Frame the project", text: "In your agent, run the adoption command. It asks, one decision at a time: the need and its users, the scope of the first version, the stack, the first business rules and the risk level.", code: "/drwil-adopt" },
          { who: "human", title: "Decide the stack and the rules", text: "Every choice stays yours. No application code is written before you approve the stack." },
          { who: "agent", title: "Write the map and declare the checks", text: "AGENTS.md, docs/architecture.md and each layer's AGENTS.md are filled in; lint and test commands are declared in .drwil/ia-first.json." },
          { who: "human", title: "Start the first workstream", text: "You pick the brief to implement; the answer moves the state to BUILD.", code: "/drwil-start" },
          { who: "agent", title: "Build inside the scope", text: "The agent codes within the brief's scope. Hooks run the checks at every commit." },
          { who: "drwil", title: "Verify", text: "Only GOVERNANCE: PASS counts. A MANUAL verdict stops the agent and asks you.", code: "npx drwil verify --agent" },
          { who: "human", title: "Attest and merge", text: "You attest manual contracts yourself, in a terminal, then merge the pull request.", code: "npx drwil attest <CONTRACT_ID>" },
        ],
      },
      {
        name: "Existing project",
        intro: "Code already exists. The kit detects it, installs around it and never overwrites a project file.",
        steps: [
          { who: "human", title: "Install in the project", text: "Run the dev dependency installation from the Install section, at the project root." },
          { who: "drwil", title: "Audit with a dry run", text: "Detects the stack, layers, AI tools and CI, and previews what would be written. Nothing is written.", code: "npx drwil init --dry-run" },
          { who: "drwil", title: "Install the kit", text: "Creates what is missing and refreshes the kit mechanics unless you modified them by hand.", code: "npx drwil init" },
          { who: "drwil", title: "Check the installation", text: "Diagnoses the setup without running any check.", code: "npx drwil doctor" },
          { who: "agent", title: "Make the kit live", text: "Re-reads the detected stack, builds the architecture map from the real code, fills each layer's AGENTS.md and declares the stack's checks.", code: "/drwil-adopt" },
          { who: "human", title: "Choose the contracts", text: "The agent proposes the catalog's contracts one by one, with their typical check. You adopt each or not, and pick the first business rule to prove." },
          { who: "drwil", title: "Validate the registry", text: "Lists and validates the contracts without running them.", code: "npx drwil contracts" },
          { who: "agent", title: "Optional: look before building", text: "A health review of drift, dead code and test gaps, or the features most worth building next.", code: "/drwil-audit\n/drwil-value" },
          { who: "human", title: "Start a workstream", text: "Then the loop is the same as for a new project: build, verify, attest, merge.", code: "/drwil-start" },
        ],
      },
    ],
    note: "The detailed procedure lives in the repository recipe docs/recipes/adopt-the-kit.md.",
  },
  commands: {
    title: "Commands.",
    lead: "The tool is a command line; the slash commands are shortcuts your agent reads from the kit.",
    cliTitle: "Command line",
    cli: [
      { cmd: "drwil init", text: "Install the kit in the current directory, or update an installed project. Creates what is missing, never overwrites project files. Options: --dry-run, --layers, --tools, --ci, --lang, --mode." },
      { cmd: "drwil doctor", text: "Diagnose the installation without running any check. Exit 0 healthy, 1 problems, 2 not a drwil project." },
      { cmd: "drwil contracts", text: "List and validate the project's contracts without running them." },
      { cmd: "drwil verify", text: "Replay the contracts' checks. PASS exits 0; FAIL or MANUAL REVIEW REQUIRED exits 1; VERIFY ERROR exits 2. Use --agent or --json for machine output." },
      { cmd: "drwil attest <id>", text: "Record a human attestation for a MANUAL contract. Interactive terminal only; an agent never runs it." },
      { cmd: "drwil state", text: "Show the governance state, or act on it: move <ACTIVITY>, start [brief], briefs, reminder." },
      { cmd: "drwil resolve-drift", text: "Resolve the mechanics drift reported by init, with a diff, a confirmation and a .bak backup." },
      { cmd: "drwil uninstall", text: "Remove the kit mechanics, driven by the installed-files manifest. Dry run by default; never touches briefs, intentions or recipes." },
    ],
    slashTitle: "Slash commands",
    slashNote: "Installed as Claude Code skills. Other AI tools receive the same recipes as instructions.",
    slash: [
      { cmd: "/drwil", text: "Menu of the kit's capabilities. With an argument (verify, adopt, audit, value, usage, progress, release) goes straight to it." },
      { cmd: "/drwil verify", text: "Run the verification and follow its next step. Only GOVERNANCE: PASS counts as validated." },
      { cmd: "/drwil-adopt", text: "Make the kit live after init: scope a new project, or fill in layers, checks and contracts of an existing one." },
      { cmd: "/drwil-start", text: "Open a poll of the scoped briefs; your answer moves the state to BUILD. Several briefs become a queue." },
      { cmd: "/drwil-audit", text: "Analyse the repository for spec drift, dead code, security blind spots and test gaps, and write docs/audit-risks.md." },
      { cmd: "/drwil-value", text: "Identify the features most worth building next and write docs/value-discovery.md." },
      { cmd: "/drwil-usage", text: "Measure the tokens used by a workstream and record it in .drwil/usage.jsonl." },
      { cmd: "/drwil-progress", text: "Generate a static HTML dashboard of project progress and contract coverage." },
      { cmd: "/drwil-release", text: "Create a Git tag and a GitHub release note on the latest merged workstream (optional module)." },
    ],
    note: "Run npx drwil --help for the authoritative list of your installed version.",
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
