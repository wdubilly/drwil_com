# Architecture — drwil_com

As of 2026-10-17. Map of the repository: what lives where. Keep it up to date in the same commit as the code it describes.

## What the application does

Computes the total of an order, with its discount rule (`APP-001`, `docs/contracts.md`). No API, screen or persistence yet.

## Stack

Node.js 24, ES modules, no runtime dependency. Tests: native runner `node --test` (`npm test`). CI: GitHub Actions (`.github/workflows/ia-first.yml`), running `.githooks/run-checks.mjs`.

## Layers

No separate layer: the code lives at the repository root.

- `src/`: business code (`src/order-total.mjs`: order total and discount).
- `tests/`: tests named after the contract they prove — `tests/order-total.test.mjs` (`APP-001: …`) tests `src/`; `tests/acceptance-demo.test.mjs` (`QUA-041: …`) replays, in throwaway copies of the working tree, the scenarios showing that a regression or a missing proof is detected.

## AI-first governance

- AI instructions: `AGENTS.md`, then the `AGENTS.md` of the layer you touch.
- Invariants: `docs/contracts.md`.
- Recipes: `docs/recipes/`.
- Checks: `.githooks/run-checks.mjs`, run on commit by `.githooks/pre-commit`. Stack-specific checks are declared in `.drwil/ia-first.json` (`checks` key).
- Kit configuration: `.drwil/ia-first.json`.
