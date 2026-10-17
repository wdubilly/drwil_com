# Architecture — drwil_com

As of 2026-10-17. Map of the repository: what lives where. Keep it up to date in the same commit as the code it describes.

## What the application does

(to describe: what the application does, for whom)

## Stack

Not decided. The user chooses it; an AI proposes one and waits for approval before writing application code.

## Layers

No separate layer: the code lives at the repository root.

## AI-first governance

- AI instructions: `AGENTS.md`, then the `AGENTS.md` of the layer you touch.
- Invariants: `docs/contracts.md`.
- Recipes: `docs/recipes/`.
- Checks: `.githooks/run-checks.mjs`, run on commit by `.githooks/pre-commit`. Stack-specific checks are declared in `.drwil/ia-first.json` (`checks` key).
- Kit configuration: `.drwil/ia-first.json`.
