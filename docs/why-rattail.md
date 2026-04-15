# Why Rattail

## The Problem

[Vite+](https://viteplus.dev) has done a great job consolidating build, test, lint, and format into one tool. But in day-to-day enterprise development, there are still things you end up wiring yourself:

- **Release workflow** — version bumping, npm publishing, changelog generation
- **Git hooks** — commit message linting, lockfile change detection
- **API codegen** — generating type-safe API modules from OpenAPI/Swagger schemas
- **Utility functions** — common helpers for strings, arrays, objects, etc.

Each of these typically requires its own tool, its own config file, and its own learning curve. Over time, project root directories fill up with config fragments, and keeping everything compatible becomes a chore.

## What Rattail Does

Rattail tries to consolidate these pieces into `vite.config.ts`, alongside Vite+:

```ts
import { defineConfig, lint, fmt, staged, hook, clean } from 'rattail/vite-plus'

export default defineConfig({
  lint: lint(),
  fmt: fmt(),
  staged: staged(),
  rattail: {
    clean: clean(),
    hook: hook(),
    release: {},
    changelog: {},
  },
})
```

One file for Vite+ config and the surrounding workflow. Fewer config files in your project root.

## AI Agent Friendly

An increasingly practical concern — AI coding assistants work better when the toolchain is cohesive:

- **Single dependency** — one library to learn, not a dozen tools with different APIs.
- **Unified Skills** — Rattail provides [Agent Skills](https://github.com/varletjs/rattail/tree/main/skills) so AI assistants can understand the whole toolchain at once.
- **Consistent patterns** — same config-driven approach for every CLI command, same import convention for every utility. Predictable structure leads to more reliable generated code.
- **Less fragmented context** — all relevant knowledge in one place, rather than spread across separate documentation sites.

## Design Principles

- **Complement Vite+** — Rattail covers what Vite+ intentionally leaves out of scope, not what it already does.
- **Config-driven** — CLI commands read from `vite.config.ts`. No scattered config files.
- **Incrementally adoptable** — `rattail/vite-plus` for presets, `rattail/cli` for the CLI, `rattail` for utilities. Use what you need, skip what you don't.
- **Sensible defaults** — works out of the box, with escape hatches when you need them.
