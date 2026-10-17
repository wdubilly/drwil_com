# Contracts (single source of invariants)

**Single source of the project's invariants.** Other documents
(`AGENTS.md`, layer `AGENTS.md` files, recipes, skills) cite a contract by
its ID and do not copy its rule.

A **contract** is an invariant of the product or the code whose violation
can be objectively observed (in the repo or at runtime). It has a stable ID
(never reassigned, even once removed), a normative rule, a scope, a source
of truth (the code that implements it), a proof and a reason. Principle:
**a contract that matters is machine-checked**; a **human** proof is
flagged as such: it's the next check to tool up.

Where the checks run: pre-commit hook (`.githooks/run-checks.mjs`, to
enable once per clone with `git config core.hooksPath .githooks`) and CI
if configured.

This registry only holds the **baseline** installed by default and the
contracts specific to this project. `docs/contracts-catalog.md` offers
other generic contracts, not yet adopted (see
`docs/recipes/adopt-the-kit.md`).

Verifiable proof (`drwil verify`, see `docs/ia-first.md`, section 5):
`**Check**` names, in backticks, the identifier of a check known to the
engine (`.githooks/engine.mjs`, or the `id` of a check in
`.drwil/ia-first.json` → `checks`); the command is never copied here.
`**Manual**` describes the part of the proof that stays human. At least one
of the two, plus a **Rule**; an unknown check is an error. A contract still
in table form (legacy) is still read, but without a Check it is never
proven (`MANUAL`).
`**Severity**` (optional): `blocking` (default), `warning` or `advisory`.
Only blocking contracts decide the `drwil verify` verdict; the others are
run and shown without changing its exit code.
`**Origin**` (optional): the workstream and the acceptance criterion the
contract was born from (`**Origin**: <workstream> — « <criterion> »`). When
its check fails, `drwil verify` shows it: the failure breaks that criterion,
a regression unless the active brief declares the change (« Modified
contracts » section).

## Security (SEC)

## SEC-006 — No known vulnerable dependency
**Rule** : No dependency with a known vulnerability.
**Scope** : project dependencies
**Source of truth** : dependency manifest (e.g. package.json, requirements.txt)
**Proof** : audit declared by the project (`.drwil/ia-first.json` → `checks`), hook + CI
**Reason** : a vulnerable library voids the rest
**Manual** : no dependency audit declared: add one in `.drwil/ia-first.json` → `checks` (with an `id`), then cite it here as **Check**.

## SEC-007 — No secret in the repo
**Rule** : No secret in the repo (`.env`, keys, passwords, client configs).
**Scope** : the whole repo and its history
**Source of truth** : —
**Proof** : gitleaks: indexed files (hook, if installed) + full history (CI job, if configured)
**Reason** : an irreversible leak once pushed
**Check** : `secrets`


## Quality (QUA)

## QUA-011 — Docs never wrong
**Rule** : Every repo path and every contract ID cited in the docs and the skills exist (IDs defined exactly once in the registry).
**Scope** : `AGENTS.md`, layer `AGENTS.md` files, `docs/`, `.claude/skills/` (if present)
**Source of truth** : —
**Proof** : `.githooks/check-docs.mjs` (hook + CI)
**Reason** : wrong docs mislead AIs
**Check** : `docs-references`

## QUA-013 — A check that did not run has not passed
**Rule** : No check can disappear without it being visible. A check that cannot run on a workstation (missing tool) is only ever a warning, never a silent success. A degradable check must also have a CI job triggered on the same paths (verified, not just assumed).
**Scope** : the checks in `.githooks/run-checks.mjs`
**Source of truth** : `.githooks/run-checks.mjs`, `.githooks/check-control-coverage.mjs` and its run history
**Proof** : **machine**: every check ends up "failed", "OK" or "not run", never hidden; CI coverage is replayed (hook + CI, if there is a CI)
**Reason** : a check that can silently not run is, eventually, a check that proves nothing
**Check** : `ci-coverage`

## QUA-015 — Projects resumable cold
**Rule** : Projects resumable cold: every open item in the project index carries an `[AI]`, `[human]` or `[decision]` marker; every brief in `docs/projects/` and `docs/intentions/` (excluding the index and README) has a dated "Status" line at the top (YYYY-MM-DD); every intent brief has "Need", "Current state" and "Open questions" sections; every brief has a "Hand-off" section (handoff). Extension: an index item that cites a brief whose "Status" contains `done`/`closed`/`terminé` must be checked, and vice versa (non-blocking warning).
**Scope** : `docs/projects/`, `docs/intentions/`
**Source of truth** : `docs/ia-first.md` (section 7)
**Proof** : `.githooks/check-docs.mjs` (hook + CI); accuracy of status and content: **human**
**Reason** : an agent picks up a project cold: without status or marker, it redoes the work, attempts a human gesture or decides in the requester's place
**Check** : `docs-references`
**Manual** : accuracy of the briefs' status and content.

## QUA-016 — Scoping reminder
**Rule** : Scoping reminder: every indexed code file is covered by the `scope` block of a brief in `docs/projects/`; a malformed block (no `files:` line, too broad a pattern) is rejected. `docs/` and any markdown file are never code. Severity configurable per project (`.drwil/ia-first.json` -> `scopeReminder`: `blocking` by default, refused at commit and, with Claude Code, before the write; `warning` to only report; `off` to disable). Outside the `blocking` setting, this contract is not proven: add a Manual field to it.
**Scope** : the whole repo (indexed files), excluding `docs/` and markdown
**Source of truth** : `.githooks/scope.mjs`, `docs/ia-first.md` (section 7)
**Proof** : `.githooks/check-docs.mjs` (hook + CI, severity per setting); agent side: `.claude/hooks/scope-reminder.mjs` (if present: refusal before the write when `blocking`, reminder when `warning`, silent when `off`)
**Reason** : code detached from any project gets lost, for an agent as much as for a person
**Check** : `docs-references`

## QUA-017 — No direct work on the main branch
**Rule** : No direct work on the main branch: committing or pushing directly to `master`/`main` is refused, including the very first commit. `init()` always switches to a working branch before any commit, with no configurable opt-out. Work must go through a branch (`docs/recipes/working-with-branches.md`) merged via a pull/merge request.
**Scope** : any git repository, including before its very first commit, local only (`pre-commit`/`pre-push`)
**Source of truth** : `docs/recipes/working-with-branches.md`
**Proof** : `.githooks/run-checks.mjs` (hook only, never in CI: a legitimate merge onto the main branch must not be blocked retroactively)
**Reason** : a direct commit or push to the main branch bypasses review and breaks the brief-branch link
**Check** : `main-branch`

## QUA-019 — No bypassing a check
**Rule** : A blocking check (test, hook, CI) is never disabled, skipped (`--no-verify`, skip, exception flag) or bypassed to make a task progress. If it seems miscalibrated, flag it and fix the check itself (or open a decision brief), never disable it silently.
**Scope** : any check in `.githooks/`, any CI, any test
**Source of truth** : this contract (recalled in `AGENTS.md`)
**Proof** : **human** — a bypass rarely leaves a machine-checkable trace (see `catalog:QUA-009` for the tooled case of a disabled test)
**Reason** : bypassing a check silently hides a regression, the opposite of QUA-013
**Manual** : a bypass rarely leaves a machine-checkable trace.

## QUA-029 — A contract's cited tests exist and carry its ID
**Rule** : Every file cited by the **Tests** field of a contract exists and contains the contract's ID (cited in the name of the test that protects it). Stack-agnostic: test names are not parsed. Blocking if the project enforces recent requirements (`newRequirements`: `blocking`, default of fresh installs), warning otherwise.
**Scope** : the **Tests** field of this registry
**Source of truth** : `.githooks/check-contract-tests.mjs`
**Proof** : `.githooks/check-contract-tests.mjs` (hook + CI, `drwil verify`)
**Reason** : a business rule is only a non-regression while its test still exists: a deleted or renamed test would leave the contract green while proving nothing
**Check** : `contract-tests`

## QUA-040 — The architecture map covers the code
**Rule** : Every folder holding code (the project's code prefixes and layers, two levels deep) is cited in `docs/architecture.md`, a project file `init` never rewrites; the setting `architectureMap.files` requires every file under chosen paths. Blocking if the project enforces recent requirements (`newRequirements`: `blocking`), warning otherwise. A workstream that changes the structure updates the map in its closing commit. The map, README and changelog are written in the `docLang` language (absent: the project language). The check judges that a folder is cited, not that its written role is right: that part stays human.
**Scope** : `docs/architecture.md`
**Source of truth** : `.githooks/check-architecture.mjs`
**Proof** : `.githooks/check-architecture.mjs` (hook + CI, `drwil verify`)
**Reason** : a map no one maintains goes stale silently, and an agent arriving later reads a wrong picture of the project
**Check** : `architecture-map`

## QUA-041 — A deliberate regression and a missing proof are detected
**Rule** : replayed in a throwaway clone, a broken business rule makes its check and `drwil verify` fail; a missing check, an unattested `Manual` contract and an attestation whose contract text changed are never reported as PASS
**Scope** : the kit's checks and `drwil verify`, as installed in this repository
**Source of truth** : `.githooks/run-checks.mjs` (if present) and `drwil verify`
**Proof** : the tests named `QUA-041: …`, run on their own by the `QUA-041` check (hook + CI, `drwil verify`)
**Reason** : a proof is only durable if breaking what it protects is actually seen
**Origin** : acceptance-criteria-demo — « A deliberate regression causes a detectable failure »
**Check** : `QUA-041`
**Tests** : `tests/acceptance-demo.test.mjs`

## QUA-042 — The acceptance-criteria experiment report is judged by the requester
**Rule** : the report `docs/experiments/acceptance-criteria-report.md` states, for each acceptance criterion, what the kit checks by machine and what stays declarative; the requester judges that it is accurate
**Scope** : the experiment report
**Source of truth** : the report
**Proof** : human attestation (`drwil attest QUA-042`)
**Reason** : distinguishing the requester's acceptance from the agent's proposal is not automatable with the kit as installed
**Origin** : acceptance-criteria-demo — « The requester's acceptance is distinguished from the agent's proposal »
**Manual** : the requester reads the report and attests it.

## Business (APP)

## APP-001 — Order total with a 10 % discount from 100 €
**Rule** : the total of an order is the sum of its lines (unit price in integer cents × quantity), minus 10 % when that subtotal is greater than or equal to 100 €, rounded half-up to the cent; the discount applies once, on the raw subtotal; a malformed order or an invalid amount or quantity is rejected with a `TypeError` or `RangeError`
**Scope** : `src/order-total.mjs`
**Source of truth** : `src/order-total.mjs` (`orderTotal`)
**Proof** : the tests named `APP-001: …`, run on their own by the `APP-001` check (hook + CI, `drwil verify`)
**Reason** : first business rule of the project: a regression on a price is visible to every customer
**Check** : `APP-001`
**Tests** : `tests/order-total.test.mjs`

## Out of registry (these are not contracts)

| Rule | Nature | Where it lives |
|---|---|---|
| Commits, personal data in an AI's outputs, secrets in tool output, attack testing on a real target, docs kept current in the same commit | conduct (human) | `AGENTS.md`, Conduct section |
| Refactor without behavior change | procedure (human) | `docs/recipes/refactor-without-breaking.md` |
| File size, project-specific code hygiene rules | opt-in tooling (no universal threshold) | `.githooks/check-file-size.mjs`, `.githooks/check-code-rules.mjs`, `docs/recipes/refactor-without-breaking.md` |
| Tests shipped with every new component | convention (human) | the relevant layer's `AGENTS.md` |
