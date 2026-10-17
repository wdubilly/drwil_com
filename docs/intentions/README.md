# Intents

An **intent** is a stated need, not yet scoped, estimated or prioritised:
it is not a commitment. Each brief states the need as it was expressed,
what already exists in the code (as read on the brief's date) and the
questions to decide before writing anything.

Lifecycle: a scoped intent becomes a workstream (`docs/projects/`);
abandoned, its brief is deleted, with the reason in the commit message.
A need that is already clear and doable as is does not go through here: it
goes straight into the workstream index. Shape of a brief (checked,
QUA-015): a dated (YYYY-MM-DD) « Status » line at the top, sections
« Need », « Current state » (read from the code, dated) and « Open
questions ». An intent re-read later and found partly outdated gets a
dated line under its Status, `**Reviewed on YYYY-MM-DD**: what became
false, what is still alive`; an intent with no dated review for 30 days is
reported by the checks. Closing a workstream updates the intent it comes
from (the brief's `**Intent**` field), or summarises it in the journal and
removes it when fully covered.

| Brief | In one line |
|---|---|
| `docs/intentions/order-line-quantity-zero.md` | Order line with a quantity of 0: rejected or worth 0 € |
| `docs/intentions/declare-the-stack.md` | Declare the stack in `.drwil/ia-first.json` |
| `docs/intentions/criteria-reevaluated-in-ci.md` | Acceptance criteria re-evaluated in CI and after closing |
| `docs/intentions/per-criterion-human-acceptance.md` | Human acceptance recorded per acceptance criterion |
| `docs/intentions/versioned-run-results.md` | Execution results kept in the repository |
| `docs/intentions/attestation-invalidated-by-code-change.md` | Attestation made obsolete when the covered code changes |
| `docs/intentions/merge-gate-required-checks.md` | Merge gate on the required checks |
| `docs/intentions/scoping-closing-frictions.md` | Contract registry and brief deletion frictions in the lifecycle |

## Brief template

```
# Intent: short title

**Status**: proposed on YYYY-MM-DD.

## Need

(the need as expressed, without rewording that decides in the requester's place)

## Current state

(read from the code on the date above; « not checked » if not read)

## Open questions

- [decision] ...
```
