---
category: CLI
---

# `rt clean`

Remove files and directories using glob patterns. Powered by [`rimraf`](https://github.com/isaacs/rimraf).

## Source

- [src/cli/clean.ts](https://github.com/varletjs/rattail/blob/main/src/cli/clean.ts)

## Usage

```bash
# Clean specific patterns (CLI args take priority)
rt clean dist coverage node_modules/.cache

# Clean using config (no CLI args → reads rattail.clean from vite.config.ts)
rt clean
```

## Configuration

In `vite.config.ts`:

```ts
export default defineConfig({
  rattail: {
    // String
    clean: 'dist',

    // Array
    clean: ['dist', 'coverage', '*.tsbuildinfo'],

    // Object
    clean: {
      patterns: ['dist', 'coverage'],
    },
  },
})
```

## Type

```ts
type CleanConfig = string | string[] | { patterns?: string[] }
```

## Programmatic

```ts
import { clean } from 'rattail/cli'

await clean(['dist', 'coverage'])
await clean() // reads from config
```
