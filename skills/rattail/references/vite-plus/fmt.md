---
category: Vite Plus
---

# fmt

Returns a preset oxfmt (formatter) configuration object with opinionated defaults.

## Documentation

- [Rattail repository](https://github.com/varletjs/rattail)

## Import

```ts
import { fmt } from 'rattail/vite-plus'
```

## Usage

```ts
import { fmt } from 'rattail/vite-plus'

// Use in oxfmt.config.ts
export default fmt({
  ignores: ['fixtures/**'],
})
// Returns:
// {
//   semi: false,
//   printWidth: 120,
//   singleQuote: true,
//   sortImports: { newlinesBetween: false },
//   sortTailwindcss: true,
//   ignorePatterns: [...],
// }
```

## Type declarations

```ts
interface FmtOptions {
  ignores?: string[]
}

declare function fmt(options?: FmtOptions): OxfmtConfig
```
