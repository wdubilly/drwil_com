# Intent: declare the stack in the kit configuration

**Status**: proposed on 2026-10-17.

## Need

The stack (Node.js 24, ES modules, `node --test`) was decided on 2026-10-17
but is only described in `docs/architecture.md`.

## Current state

Read on 2026-10-17: the `stack` key of `.drwil/ia-first.json` is still an
empty list; its expected format was not found in the kit's documentation,
so it was left empty rather than guessed.

## Open questions

- [decision] Fill in `stack` (format to read from the kit), or leave it
  empty as long as no kit tool depends on it?
