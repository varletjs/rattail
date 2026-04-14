# CLI Getting Started

## Overview

Rattail provides a CLI tool `rt` for common development tasks such as cleaning build artifacts, generating API modules, installing git hooks, releasing packages, and more. The CLI is designed for [Vite+](https://viteplus.dev) projects, so it uses `vite.config.ts` as the configuration file.

### Configuration

Configure the CLI in `vite.config.ts` using `defineConfig` from `rattail/vite-plus`. If you prefer not to worry about the details, we also provide a ready-to-use preset — see [Presets](/vite-plus/presets).

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    clean: ['dist', 'node_modules/.cache'],

    hook: {
      'pre-commit': ['vp lint --fix', 'vp fmt'],
      'commit-msg': ['rt commit-lint -p $1'],
      'post-merge': ['rt lockfile-check -i'],
    },

    // rt api options, see rt api docs
    api: {
      input: './openapi.json',
      output: './src/apis',
    },

    // rt release options, see rt release docs
    release: {},

    // rt changelog options, see rt changelog docs
    changelog: {},
  },
})
```

::: tip
Only the `defineConfig` exported from `rattail/vite-plus` provides type hints for the `rattail` field. Do not use `defineConfig` from `vite-plus` directly if you need type support for CLI configuration.
:::

### Commands

| Command | Description |
| --- | --- |
| `rt clean` | Remove files and directories |
| `rt api` | Parse OpenAPI/Swagger schema to generate API modules |
| `rt hook` | Install git hooks from config |
| `rt release` | Release all packages and generate changelogs |
| `rt changelog` | Generate changelog |
| `rt commit-lint` | Lint commit message |
| `rt lockfile-check` | Check if lockfile has been updated |

### Programmatic Usage

All CLI commands can also be used programmatically:

```ts
import {
  clean,
  api,
  hook,
  release,
  changelog,
  commitLint,
  lockfileCheck,
} from 'rattail/cli'
```
