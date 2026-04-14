---
category: CLI
---

# `rt release`

Release all packages, generate changelogs, tag, and optionally publish to npm. Powered by [`@varlet/release`](https://github.com/varletjs/release).

## Source

- [src/cli/release.ts](https://github.com/varletjs/rattail/blob/main/src/cli/release.ts)

## Usage

```bash
rt release
```

This replaces the standalone `vr release` CLI. The command reads configuration from `rattail.release` in `vite.config.ts`.

## Configuration

In `vite.config.ts`:

```ts
export default defineConfig({
  rattail: {
    release: {
      // ReleaseCommandOptions from @varlet/release
      remote: 'origin',
      skipNpmPublish: false,
      skipChangelog: false,
      skipGitTag: false,
      npmTag: undefined,
      checkRemoteVersion: false,
      task: async (newVersion, oldVersion) => {
        // custom task after version bump
      },
    },
  },
})
```

## Options (`ReleaseCommandOptions`)

| Option               | Type                                        | Description                                 |
| -------------------- | ------------------------------------------- | ------------------------------------------- |
| `remote`             | `string`                                    | Git remote URL or name                      |
| `skipNpmPublish`     | `boolean`                                   | Do not publish to npm                       |
| `skipChangelog`      | `boolean`                                   | Skip changelog generation                   |
| `skipGitTag`         | `boolean`                                   | Skip creating git tag                       |
| `npmTag`             | `string`                                    | npm publish tag (e.g. `next`)               |
| `checkRemoteVersion` | `boolean`                                   | Abort if npm already has same version       |
| `task`               | `(newVersion, oldVersion) => Promise<void>` | Hook to run after version bump (e.g. build) |

## Programmatic

```ts
import { release } from 'rattail/cli'

await release({
  task: async (newVersion, oldVersion) => {
    await buildProject()
  },
})
await release() // reads from config
```

## Official docs

- [@varlet/release README](https://github.com/varletjs/release/blob/main/README.md)
- [@varlet/release Chinese README](https://github.com/varletjs/release/blob/main/README.zh-CN.md)
