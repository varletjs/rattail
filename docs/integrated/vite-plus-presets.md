# vite-plus-presets

Opinionated [Oxlint](https://oxc.rs/docs/guide/usage/linter) + [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) configuration preset for [Vite+](https://viteplus.dev) projects. Integrated with [@configurajs/vite-plus](https://github.com/configurajs/vite-plus).

### Features

- TypeScript (enabled by default)
- Vue 3 (enabled by default)
- React (opt-in)
- Vitest (enabled by default)
- Type-aware linting
- Oxfmt formatting with import sorting and Tailwind CSS class sorting
- Lint-staged preset out of the box

### Usage

#### Oxc Configuration File

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

#### Vite+ Configuration File

If you are using [Vite+](https://viteplus.dev), you can configure lint and fmt in `vite.config.ts` directly:

```ts
import { defineConfig } from 'vite-plus'
import { lint, fmt, staged } from 'rattail/vite-plus'

export default defineConfig({
  lint: lint(),
  fmt: fmt(),
  staged: staged(),
})
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
//   '*.{js,jsx,ts,tsx,vue}': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix'],
//   '*.{md,json,yaml,yml,html,css,scss,less}': 'vp fmt --no-error-on-unmatched-pattern',
// }
```

- `js / jsx / ts / tsx / vue` — Format and lint fix
- `md / json / yaml / yml / html / css / scss / less` — Format only

### VSCode Settings

Add the following to `.vscode/settings.json`:

```jsonc
{
  "prettier.enable": false,
  "eslint.enable": false,
  "editor.defaultFormatter": "oxc.oxc-vscode",
}
```

### Reference

[@configurajs/vite-plus](https://github.com/configurajs/vite-plus/blob/main/README.md)
