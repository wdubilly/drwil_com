# Intent: acceptance criteria turned into durable controls

**Status**: proposed on 2026-10-17.

## Need

As expressed by the requester (2026-10-17): let drwil turn the acceptance
criteria validated for a task into durable, traceable controls, run at the
relevant integrations, so that the expected behaviors are preserved as the
code changes.

Proposed acceptance criteria — **not accepted yet**, to settle at scoping:

- An acceptance criterion can be identified and linked to a task.
- Its human acceptance is distinguished from the agent's proposal.
- An automated proof is linked to the control actually run.
- The associated tests are kept in the repository and run by the planned
  CI mechanism.
- A deliberate regression causes a detectable failure.
- Missing proofs and pending human validations are never presented as
  successes.
- The scope is demonstrated in a reproducible test repository.

## Current state

Read on 2026-10-17 in this repository (drwil 0.6.1, after the order-total
workstream, `APP-001`):

- **Criterion ↔ task**: a brief's « Acceptance criteria » section has one
  line per criterion, ending with a contract ID in backticks
  (`docs/projects/model-brief.md`); starting and closing are refused
  without criteria. A criterion has no ID of its own: it is identified by
  its text and its contract.
- **Human acceptance vs agent proposal**: not machine-distinguished. The
  agent writes the criteria; the requester's validation is a declarative
  line in the brief's « Decisions » (e.g. « criteria validated as is
  (requester) »). Starting the workstream (`/drwil-start`, a human answer
  read by a hook) is the only machine-checked human gesture, and it
  validates the whole brief, not each criterion.
- **Proof ↔ executed control**: each contract cites a **Check**
  (`.drwil/ia-first.json` → `checks`, with an `id`) and its **Tests**;
  QUA-029 (cited tests exist and carry the ID) checks the link;
  `drwil verify --evidence` writes `.drwil/evidence/criteria-*.md`
  (criterion → contract → verdict) and `verify-*.json`.
- **Durability of the results**: those two evidence files are ignored by
  git (`.gitignore`, `.drwil/evidence/*`): only the attestations
  (`.drwil/evidence/attestations/`) are committed. Execution results are
  not kept in the repository; CI keeps them only in its run logs.
- **Executed in CI**: `.github/workflows/ia-first.yml` runs
  `.githooks/run-checks.mjs`; QUA-013 (a check that did not run has not
  passed) turns « not run » into a failure on push and in CI;
  `.githooks/check-control-coverage.mjs` checks that a degradable check has
  a CI job triggered on its paths. Branch protection is not set up on
  `wdubilly/drwil_com`: PR #1 was merged before any required check.
- **Non-automatable criteria**: `[human]` marker → `Manual` contract →
  `drwil attest <ID>`, interactive terminal only, bound by fingerprint to the
  contract's text and proof definition (`node_modules/drwil/dist/attest.js` (if present)).
- **Invalidation of an earlier proof**: an automated proof is replayed at
  every verify and in CI. A human attestation becomes obsolete only when
  the contract's text or proof definition changes, **not** when the code
  it covers changes. A contract modified without a « Modified contracts »
  line in the brief blocks closing.
- **Regression detected**: not demonstrated yet — no deliberate break of
  `APP-001` has been run.

## Open questions

- Decided on 2026-10-17 (requester): the work happens in this repository,
  `drwil_com`, as the reproducible test repository — a demonstration of
  what the kit covers and a report on its gaps; the kit's own files stay
  untouched. The experiment is scoped precisely before any functional
  change.
- [decision] Does a criterion need its own identifier, or is
  « criterion text + contract ID » enough?
- [decision] How is the human acceptance of each criterion recorded: an
  attestation per criterion, a gesture at start, or the existing
  brief-level decision line?
- [decision] Should execution results be kept in the repository (evidence
  files no longer ignored), or are the CI logs enough?
- [decision] Should a human attestation also become obsolete when the
  code under the contract's scope changes?
- [decision] Should branch protection with required checks be enabled on
  GitHub, so that a merge cannot skip CI?
- [decision] Which proposed criteria are accepted, and how is each one
  proven (contract to create or to reuse, or `[human]`)?
