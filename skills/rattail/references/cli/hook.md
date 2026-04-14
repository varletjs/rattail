---
category: CLI
---

# `rt hook`

Install git hooks from config. Writes hook scripts to the directory specified by `git config core.hooksPath`.

## Source

- [src/cli/hook.ts](https://github.com/varletjs/rattail/blob/main/src/cli/hook.ts)

## Prerequisites

Set the git hooks directory first:

```bash
vp config --hooks-dir .vite-hooks
```

This sets `core.hooksPath` in the git config to `.vite-hooks`. The hook files will be written to this directory.

## Usage

```bash
rt hook
```

Typically used in `prepare` script:

```json
{
  "scripts": {
    "prepare": "vp config --hooks-dir .vite-hooks && rt hook"
  }
}
```

## Configuration

In `vite.config.ts`:

```ts
export default defineConfig({
  rattail: {
    hook: {
      'commit-msg': ['rt commit-lint $1'],
      'pre-commit': ['vp lint --fix', 'vp fmt'],
    },
  },
})
```

Each key is a git hook name, and the value is an array of shell commands. Commands are joined with newlines and written to the hook file.

## Supported hooks

`applypatch-msg`, `pre-applypatch`, `post-applypatch`, `pre-commit`, `pre-merge-commit`, `prepare-commit-msg`, `commit-msg`, `post-commit`, `pre-rebase`, `post-checkout`, `post-merge`, `pre-push`, `pre-auto-gc`, `post-rewrite`.

## Type

```ts
type GitHook =
  | 'applypatch-msg'
  | 'pre-applypatch'
  | 'post-applypatch'
  | 'pre-commit'
  | 'pre-merge-commit'
  | 'prepare-commit-msg'
  | 'commit-msg'
  | 'post-commit'
  | 'pre-rebase'
  | 'post-checkout'
  | 'post-merge'
  | 'pre-push'
  | 'pre-auto-gc'
  | 'post-rewrite'

type HookConfig = Partial<Record<GitHook, string[]>>
```

## Programmatic

```ts
import { hook, writeHooks, getHooksDir } from 'rattail/cli'

await hook() // reads from config

// or write hooks directly
writeHooks(
  {
    'commit-msg': ['rt commit-lint $1'],
  },
  '/path/to/hooks/dir',
)
```
