---
category: Vite Plus
---

# lint

Creates an `OxlintConfig` with sensible defaults for TypeScript, Vue 3, and Vitest. Supports optional React mode.

## Documentation

- [Repository](https://github.com/configurajs/vite-plus)

## Import

```ts
import { lint } from 'rattail/vite-plus'
```

## Usage

```ts
import { lint } from 'rattail/vite-plus'

// Default: ts + vue 3 + vitest enabled, react disabled
const config = lint()

// Customize
const config = lint({
  ts: true, // TypeScript support (default: true)
  vue: true, // Vue support, version 3 by default (default: true)
  react: false, // React support (default: false)
  vitest: true, // Vitest support (default: true)
  rules: {
    // Custom rules
    eqeqeq: 'warn',
  },
  ignores: ['dist/**'], // Ignore patterns
  overrides: [], // Additional overrides
})
```

## Type declarations

```ts
interface LintOptions {
  ts?: boolean
  vue?: boolean | LintOptionsVue
  react?: boolean
  vitest?: boolean
  rules?: Record<string, DummyRule>
  ignores?: string[]
  overrides?: OxlintOverride[]
}

type LintOptionsVue = Partial<Pick<CreateVueConfigOptions, 'version'>>

interface CreateVueConfigOptions {
  version?: 2 | 3
}

declare function lint(options?: LintOptions): OxlintConfig
```
