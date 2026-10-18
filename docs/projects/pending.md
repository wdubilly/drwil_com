# Pending work — index

One line per topic. Detail and **status** live in the linked brief, the only
source: this index copies no state. A topic without a link fits in two
lines here. Unscoped ideas: `docs/intentions/README.md`. Writing rules:
`docs/ia-first.md`, section 7.

Mandatory marker on every open item (QUA-015): `[AI]` doable by an agent in
the repo; `[human]` a gesture outside the repo (server, vault, approval,
infrastructure); `[decision]` to be settled by the requester before any
work. An agent does not attempt a `[human]` gesture and does not decide a
`[decision]`: it raises it. Small tasks that don't justify a project:
`docs/projects/routine-maintenance.md`.

Optional priority, not checked by check-docs.mjs (plain convention): `[P0]`
most urgent, `[P1]` high, `[P2]` normal, `[P3]` least urgent. Without a tag,
a topic is considered `[P2]`.

A project whose brief is **entirely** finished (not just one point among
others) is condensed into `docs/projects/journal.md` then removed from
this index, not checked: see
`docs/recipes/working-with-branches.md`, "Closing" section. Remaining
checked lines are already-done points of a brief that stays open
otherwise.

## Projects

### Orders

- [ ] [decision] Order line with a quantity of 0 —
  `docs/intentions/order-line-quantity-zero.md`.

### Kit

- [ ] [decision] Acceptance criteria re-evaluated in CI and after closing —
  `docs/intentions/criteria-reevaluated-in-ci.md`.
- [ ] [decision] Human acceptance recorded per acceptance criterion —
  `docs/intentions/per-criterion-human-acceptance.md`.
- [ ] [decision] Execution results kept in the repository —
  `docs/intentions/versioned-run-results.md`.
- [ ] [decision] Attestation made obsolete when the covered code changes —
  `docs/intentions/attestation-invalidated-by-code-change.md`.
- [ ] [decision] Merge gate on the required checks —
  `docs/intentions/merge-gate-required-checks.md`.
- [ ] [decision] Contract registry and brief deletion frictions in the lifecycle —
  `docs/intentions/scoping-closing-frictions.md`.

- [ ] [decision] Declare the stack in the kit configuration —
  `docs/intentions/declare-the-stack.md`.

### Website

- [ ] [human] drwil presentation website (Vite, React, 3D, bilingual) —
  `docs/projects/presentation-site.md`.

<!-- Example:
- [ ] [AI] short title of the topic, link to a brief if more than two lines
  are needed, otherwise the topic fits here.
- [x] topic delivered (YYYY-MM-DD).
-->
