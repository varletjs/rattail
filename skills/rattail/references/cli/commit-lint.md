---
category: CLI
---

# `rt commit-lint`

Lint a commit message file. Powered by [`@varlet/release`](https://github.com/varletjs/release).

## Source

- [src/cli/commitLint.ts](https://github.com/varletjs/rattail/blob/main/src/cli/commitLint.ts)

## Usage

```bash
rt commit-lint <commitMessagePath>
```

This replaces the standalone `vr commit-lint` CLI. Typically used as a git `commit-msg` hook:

```ts
// vite.config.ts
export default defineConfig({
  rattail: {
    hook: {
      'commit-msg': ['rt commit-lint $1'],
    },
  },
})
```

Where `$1` is the path to the commit message file (e.g. `.git/COMMIT_EDITMSG`), automatically provided by git.

## Options (`CommitLintCommandOptions`)

| Option              | Type     | Description                                    |
| ------------------- | -------- | ---------------------------------------------- |
| `commitMessagePath` | `string` | **Required.** Path to the commit message file  |
| `commitMessageRe`   | `RegExp` | Custom regex for allowed commit message format |
| `errorMessage`      | `string` | Custom message when validation fails (error)   |
| `warningMessage`    | `string` | Custom message when validation fails (warning) |

## Programmatic

```ts
import { commitLint } from 'rattail/cli'

commitLint({
  commitMessagePath: '.git/COMMIT_EDITMSG',
  commitMessageRe: /^(feat|fix)\(.+\): .+/,
})
```
