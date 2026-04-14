---
category: CLI
---

# Configuration

All `rt` CLI commands read from the `rattail` key inside `vite.config.ts`. Configuration is loaded via [`unconfig`](https://github.com/antfu/unconfig), supporting `.ts`, `.js`, `.mjs`, `.cjs`, etc.

## Source

- [src/cli/config.ts](https://github.com/varletjs/rattail/blob/main/src/cli/config.ts)

## Full example

```ts
// vite.config.ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    clean: ['dist', 'coverage'],

    hook: {
      'commit-msg': ['rt commit-lint $1'],
      'pre-commit': ['vp lint --fix', 'vp fmt'],
    },

    api: {
      input: './schema.yaml',
      output: './src/apis/generated',
      preset: 'axle',
    },

    release: {
      // @varlet/release ReleaseCommandOptions
    },

    changelog: {
      // @varlet/release ChangelogOptions
    },
  },
})
```

## `RattailConfig` type

```ts
import type { ChangelogOptions, ReleaseCommandOptions } from '@varlet/release'
import type { GenerateOptions } from 'api-farmer'

type GitHook =
  | 'applypatch-msg'
  | 'pre-applypatch'
  | 'post-applypatch'
  | 'pre-commit'
  | 'pre-merge-commit'
  | 'prepare-commit-msg'
  | 'commit-msg'
  | 'post-commit'
  | 'pre-rebase'
  | 'post-checkout'
  | 'post-merge'
  | 'pre-push'
  | 'pre-auto-gc'
  | 'post-rewrite'

type HookConfig = Partial<Record<GitHook, string[]>>

type CleanConfig = string | string[] | { patterns?: string[] }

type RattailConfig = {
  clean?: CleanConfig
  hook?: HookConfig
  api?: GenerateOptions
  release?: ReleaseCommandOptions
  changelog?: ChangelogOptions
}
```

## Config resolution

The config loader reads `vite.config` files and extracts the `rattail` key from the resolved config object. The config function or object is awaited if it returns a promise. If no config is found, an empty object `{}` is used as the default.

## Programmatic access

```ts
import { getConfig } from 'rattail/cli'

const config = await getConfig() // returns resolved RattailConfig
```
