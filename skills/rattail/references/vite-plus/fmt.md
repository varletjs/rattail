---
category: Vite Plus
---

# fmt

Returns a preset oxfmt (formatter) configuration object with opinionated defaults.

## Documentation

- [Repository](https://github.com/configurajs/vite-plus)

## Import

```ts
import { fmt } from 'rattail/vite-plus'
```

## Usage

```ts
import { fmt } from 'rattail/vite-plus'

// Use in oxfmt.config.ts
export default fmt()
// Returns:
// {
//   semi: false,
//   printWidth: 120,
//   singleQuote: true,
//   sortImports: { newlinesBetween: false },
//   sortTailwindcss: true,
// }
```

## Type declarations

```ts
declare function fmt(): {
  semi: false
  printWidth: number
  singleQuote: true
  sortImports: {
    newlinesBetween: false
  }
  sortTailwindcss: true
}
```
