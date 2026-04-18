# CLI Getting Started

## Overview

Rattail provides a CLI tool `rt`, designed for [Vite+](https://viteplus.dev) projects, using `vite.config.ts` as the configuration file.

```shell
rt clean          # Clean files and directories
rt api            # Parse OpenAPI/Swagger schema to generate API modules
rt hook           # Install git hooks from config
rt release        # Release workspace npm packages and generate changelogs
rt changelog      # Generate changelog
rt commit-lint    # Lint commit message
rt lockfile-check # Check if lockfile has been updated
```

### Configuration

Configure in `vite.config.ts`:

```ts
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
    // rt clean options, see rt clean docs
    clean: clean(),

    // rt hook options, see rt hook docs
    hook: hook(),

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
Only the `defineConfig` exported from `rattail/vite-plus` provides type hints for the `rattail` field.
:::

### Presets

Out-of-the-box presets:

- `lint()`: [Oxlint](https://oxc.rs/docs/guide/usage/linter) configuration preset with built-in `TypeScript`, `Vue 3`, and `Vitest` support, optional `React`.
- `fmt()`: [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) formatting preset with `import sorting` and `Tailwind CSS class sorting`.
- `staged()`: Ready-to-use `lint-staged` preset that auto-formats and lint-fixes staged files.
- `hook()`: `Git hooks` preset with `commit-lint` and `lockfile-check` enabled by default.
- `clean()`: Default clean patterns preset for the `rt clean` command.

#### Standalone Usage

Create `oxlint.config.ts` in your project root:

```ts
import { lint } from 'rattail/vite-plus'

export default lint()
```

Create `oxfmt.config.ts` in your project root:

```ts
import { fmt } from 'rattail/vite-plus'

export default fmt()
```

#### lint

```ts
lint({
  // Enable TypeScript support (default: true)
  ts: true,
  // Enable Vue support, version 3 by default (default: true)
  vue: true, // or { version: 2 }
  // Enable React support (default: false)
  react: false,
  // Enable Vitest support (default: true)
  vitest: true,
  // Custom rules
  rules: {
    'no-console': 'error',
  },
  // Additional overrides
  overrides: [
    {
      files: ['scripts/**'],
      rules: { 'no-console': 'off' },
    },
  ],
})
```

#### fmt

```ts
fmt({
  // Ignore file patterns
  ignores: ['**/generated/**'],
})
```

#### Staged

`staged()` returns a preset lint-staged configuration:

```ts
staged()
// Equivalent to:
// {
//   '*.{js,jsx,ts,tsx}': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix --no-error-on-unmatched-pattern'],
//   '*.{md,json,yaml,yml,html,css,scss,less}': 'vp fmt --no-error-on-unmatched-pattern',
//   '*.vue': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix --no-error-on-unmatched-pattern'],
// }
```


#### hook

`hook()` returns a preset git hooks configuration with `commit-lint` and `lockfile-check` enabled by default:

```ts
import { hook } from 'rattail/vite-plus'

hook()
// {
//   'commit-msg': ['rt commit-lint $1'],
//   'post-merge': ['rt lockfile-check'],
// }
```

Disable specific hooks via options:

```ts
hook({ commitLint: false })
hook({ lockfileCheck: false })
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `commitLint` | `boolean` | `true` | Enable commit-msg hook |
| `lockfileCheck` | `boolean` | `true` | Enable post-merge hook |

#### clean

`clean()` provides a default set of clean patterns for [rt clean](/cli/clean):

```ts
import { clean } from 'rattail/vite-plus'

clean()
// { patterns: ['**/node_modules', '**/dist', '**/coverage'] }

clean({ patterns: ['**/temp'] })
// { patterns: ['**/node_modules', '**/dist', '**/coverage', '**/temp'] }
```

### Commands

| Command | Description |
| --- | --- |
| `rt clean` | Clean files and directories |
| `rt api` | Parse OpenAPI/Swagger schema to generate API modules |
| `rt hook` | Install git hooks from config |
| `rt release` | Release workspace npm packages and generate changelogs |
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

### VSCode Settings

Add the following to `.vscode/settings.json`:

```jsonc
{
  "prettier.enable": false,
  "eslint.enable": false,
  "editor.defaultFormatter": "oxc.oxc-vscode",
}
```
