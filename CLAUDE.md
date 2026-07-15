# CLAUDE.md

## Overview

Monorepo of npm packages (`@nsis/*`) providing JavaScript/TypeScript tooling for NSIS (Nullsoft Scriptable Install System).

## Commands

```bash
pnpm build            # build all packages
pnpm test             # test all packages
pnpm lint             # lint all packages

# Single package
pnpm --filter @nsis/dent test
```

## Generated Code

Do not edit directly — edit the `.grammar` / `.pegjs` source files instead, then rebuild:

- `packages/codemirror/src/parser.ts` and `parser.terms.ts` — from `src/nsis.grammar` (lezer-generator)
- `packages/parser/src/grammar.js` and `grammar.d.ts` — from `src/grammar.pegjs` (peggy)

## Architecture

- **@nsis/codemirror** has its own Lezer grammar, independent from **@nsis/parser** (PEG-based).
- **@nsis/dent** is the indentation library; **dent-cli** and **dent-ui** (Svelte 5) wrap it.
- **@nsis/nlf** reads/writes NSIS Language Files; **nlf-cli** and **vite-plugin-nlf** wrap it.

## Conventions

- Conventional Commits enforced via commitlint + lefthook.
- Shared dependency versions use the `catalog:` protocol in `pnpm-workspace.yaml`.
- Imports always include the *actual* file extension (we use `allowImportingTsExtensions=true`).
- Browser code is tested in Vitest browser mode, do not use browser mocking libraries such as `jsdom` or `happy-dom`.

## NSIS

- Documentation for NSIS commands is available via `makensis -CMDHELP <command>`. Omit the command to get the full command reference.
