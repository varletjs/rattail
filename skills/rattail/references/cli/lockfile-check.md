---
category: CLI
---

# `rt lockfile-check`

Check if the lockfile has been updated and auto-install dependencies. Powered by [`@varlet/release`](https://github.com/varletjs/release).

## Source

- [src/cli/lockfileCheck.ts](https://github.com/varletjs/rattail/blob/main/src/cli/lockfileCheck.ts)

## Usage

```bash
# Auto-detect package manager
rt lockfile-check

# Specify package manager
rt lockfile-check -m pnpm

# Skip install, only check
rt lockfile-check -s
```

Typically used as a `post-checkout` or `post-merge` git hook:

```ts
// vite.config.ts
export default defineConfig({
  rattail: {
    hook: {
      'post-checkout': ['rt lockfile-check'],
      'post-merge': ['rt lockfile-check'],
    },
  },
})
```

## CLI Options

| Option          | Flag                             | Description                                     |
| --------------- | -------------------------------- | ----------------------------------------------- |
| Package manager | `-m, --packageManager <manager>` | Package manager (`npm`, `yarn`, `pnpm`)         |
| Skip install    | `-s, --skipInstall`              | Skip install dependencies when lockfile changed |

## Type (`LockfileCheckOptions`)

```ts
interface LockfileCheckOptions {
  packageManager?: 'npm' | 'yarn' | 'pnpm'
  skipInstall?: boolean
}
```

## Programmatic

```ts
import { lockfileCheck } from 'rattail/cli'

await lockfileCheck({ packageManager: 'pnpm' })
await lockfileCheck() // auto-detect
```
