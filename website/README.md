# DRWIL presentation site

Bilingual (`/en`, `/fr`) presentation site of [drwil](https://github.com/wdubilly/drwil). Vite, React, TypeScript, React Three Fiber; pnpm. The demonstration is illustrative (sample data); it never runs the drwil CLI.

## Develop

```sh
cd website
pnpm install
pnpm dev          # http://localhost:5173/en/
```

## Check

```sh
pnpm typecheck
pnpm test                 # Vitest: demonstration model, EN/FR parity
pnpm exec playwright install chromium
pnpm test:e2e             # Playwright: fallback, reduced motion, scenarios, keyboard
pnpm check:links          # anchors + external URLs (needs network; --offline skips the latter)
```

## Deploy on Netlify

`netlify.toml` at the repository root sets the base directory (`website`), the build command (`pnpm build`), the publish directory (`dist`), the `/` → `/en/` redirect and the single-page fallback for `/en` and `/fr`. Connect the repository in Netlify (or `netlify deploy --prod --dir=website/dist` after `pnpm build`); no environment variable is needed.

## Content rules

Copy lives in `src/i18n/en.ts` (the `Dict` type) and `src/i18n/fr.ts`; the two must keep the same structure. Every external URL lives in `src/links.ts`. Claims must trace to the drwil README or source.
