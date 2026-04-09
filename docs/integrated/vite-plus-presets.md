# vite-plus-presets

Opinionated [Oxlint](https://oxc.rs/docs/guide/usage/linter) + [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) configuration preset for [Vite+](https://viteplus.dev) projects. Integrated with [@configurajs/vite-plus](https://github.com/configurajs/vite-plus).

### Features

- TypeScript (enabled by default)
- Vue 3 (enabled by default)
- React (opt-in)
- Vitest (enabled by default)
- Type-aware linting
- Oxfmt formatting with import sorting and Tailwind CSS class sorting

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
import { lint, fmt } from 'rattail/vite-plus'

export default defineConfig({
  lint: lint(),
  fmt: fmt(),
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
