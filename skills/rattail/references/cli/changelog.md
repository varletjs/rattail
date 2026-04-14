---
category: CLI
---

# `rt changelog`

Generate changelog file. Powered by [`@varlet/release`](https://github.com/varletjs/release).

## Source

- [src/cli/changelog.ts](https://github.com/varletjs/rattail/blob/main/src/cli/changelog.ts)

## Usage

```bash
rt changelog
```

This replaces the standalone `vr changelog` CLI. The command reads configuration from `rattail.changelog` in `vite.config.ts`.

## Configuration

In `vite.config.ts`:

```ts
export default defineConfig({
  rattail: {
    changelog: {
      // ChangelogOptions from @varlet/release
      file: 'CHANGELOG.md',
      releaseCount: 0,
      preset: 'angular',
    },
  },
})
```

## Options (`ChangelogOptions`)

| Option         | Type     | Description                                                              |
| -------------- | -------- | ------------------------------------------------------------------------ |
| `file`         | `string` | Output filename (default: `CHANGELOG.md`)                                |
| `releaseCount` | `number` | How many releases to include                                             |
| `preset`       | `string` | `conventional-changelog` preset (`angular`, `conventionalcommits`, etc.) |

## Programmatic

```ts
import { changelog } from 'rattail/cli'

await changelog({ file: 'CHANGELOG.md', preset: 'angular' })
await changelog() // reads from config
```
