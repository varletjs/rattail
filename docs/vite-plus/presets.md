# Presets

Out-of-the-box presets.

### Features

- `lint()`: [Oxlint](https://oxc.rs/docs/guide/usage/linter) configuration preset with built-in TypeScript, Vue 3, and Vitest support, optional React
- `fmt()`: [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) formatting preset with import sorting and Tailwind CSS class sorting
- `staged()`: Ready-to-use lint-staged preset that auto-formats and lint-fixes staged files
- `hook()`: Git hooks preset with commit-lint and lockfile-check enabled by default
- `clean()`: Default clean patterns preset for the `rt clean` CLI command

### Usage with Vite+

Recommended to use with [Vite+](https://viteplus.dev). `defineConfig` extends Vite+'s `defineConfig` with the `rattail` field for [CLI](/cli/getting-started) configuration:

```ts
import {
  defineConfig,
  lint, fmt, staged,
  hook, clean,
} from 'rattail/vite-plus'

export default defineConfig({
  lint: lint(),

  fmt: fmt(),

  staged: staged(),

  rattail: {
    clean: clean(),

    hook: hook(),
  },
})
```

### Standalone Usage

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

### Lint Options

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

### Fmt Options

```ts
fmt({
  // Ignore file patterns
  ignores: ['**/generated/**'],
})
```

### Staged

`staged()` returns a preset lint-staged configuration:

```ts
staged()
// Equivalent to:
// {
//   '*.{js,jsx,ts,tsx}': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix'],
//   '*.{md,json,yaml,yml,html,css,scss,less}': 'vp fmt --no-error-on-unmatched-pattern',
//   '*.vue': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix'],
// }
```

- `js / jsx / ts / tsx / vue` — Format and lint fix
- `md / json / yaml / yml / html / css / scss / less` — Format only

### hook

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

If the preset doesn't meet your needs, you can fully customize the `hook` configuration:

```ts
hook: {
  'commit-msg': ['rt commit-lint $1'],
  'pre-push': ['vp lint'],
}
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `commitLint` | `boolean` | `true` | Enable commit-msg hook |
| `lockfileCheck` | `boolean` | `true` | Enable post-merge hook |

### clean

`clean()` provides a default set of clean patterns for the [CLI](/cli/clean):

```ts
import { clean } from 'rattail/vite-plus'

clean()
// { patterns: ['**/node_modules', '**/dist', '**/coverage'] }

clean({ patterns: ['**/temp'] })
// { patterns: ['**/node_modules', '**/dist', '**/coverage', '**/temp'] }
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
