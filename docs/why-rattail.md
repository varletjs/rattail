# Why Rattail

## The Problem

[Vite+](https://viteplus.dev) has done a great job consolidating build-related work into one tool. But in enterprise development, there are still things you end up wiring yourself:

- **Release workflow** — version bumping, npm publishing, changelog generation
- **Git hooks** — commit message linting, lockfile change detection
- **API codegen** — generating type-safe API modules from OpenAPI/Swagger schemas
- **Utility functions** — common helpers for strings, arrays, objects, etc.

## AI Agent Friendly

An increasingly practical concern — AI coding assistants work better when the toolchain is cohesive:

- **Single dependency** — one library to learn, not a dozen tools with different APIs.
- **Unified Skills** — Rattail provides [Agent Skills](https://github.com/varletjs/rattail/tree/main/skills) so AI assistants can understand the whole toolchain at once.
- **Built-in presets** — the toolchain's lint, format, and other presets let AI assistants directly understand the project's code conventions, so generated code naturally follows team standards.
- **Consistent patterns** — same config-driven approach for every CLI command, same import convention for every utility. Predictable structure leads to more reliable generated code.
- **Less fragmented context** — all relevant knowledge in one place, rather than spread across separate documentation sites.

## Design Principles

- **Complement Vite+** — Rattail covers what Vite+ intentionally leaves out of scope, not what it already does.
- **Config-driven** — CLI commands read from `vite.config.ts`. No scattered config files.
- **Incrementally adoptable** — `rattail/vite-plus` for presets, `rattail/cli` for the CLI, `rattail` for utilities. Use what you need, skip what you don't.
- **Sensible defaults** — works out of the box, with escape hatches when you need them.

## What Rattail Does

Rattail brings these loose ends together in three ways:

- **Unified configuration** — lint, format, `staged`, and workflow-related options (release, hooks, API codegen, etc.) live in `vite.config.ts` next to Vite+, so you keep fewer one-off config files in the project root.
- **CLI for chores** — the `rt` CLI reads the same config to run publishing, changelogs, git hooks, OpenAPI codegen, and other peripheral tasks.
- **Utilities for daily work** — the main `rattail` package exposes a large, tree-shakable set of helpers for strings, collections, requests, and other everyday coding needs.

```ts
// vite.config.ts
import {
  defineConfig,
  lint,
  fmt,
  staged,
  hook,
  clean,
} from 'rattail/vite-plus'

export default defineConfig({
  lint: lint(),

  fmt: fmt(),

  staged: staged(),

  rattail: {
    // rt clean
    clean: clean(),

    // rt hook
    hook: hook(),

    // rt api
    api: {
      input: './openapi.json',
      output: './src/apis',
    },

    // rt release
    release: {},

    // rt changelog
    changelog: {},
  },
})
```
