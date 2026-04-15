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
rt release --skip-npm-publish
rt release --npm-tag beta
rt release --skip-changelog --skip-git-tag
rt release --check-remote-version --remote upstream
```

This replaces the standalone `vr release` CLI. The command reads configuration from `rattail.release` in `vite.config.ts`. All config options (except `task`) can also be passed as CLI arguments. CLI arguments take priority over config.

## CLI Arguments

| Argument                     | Description                                               |
| ---------------------------- | --------------------------------------------------------- |
| `-t, --npm-tag <tag>`        | npm dist-tag for publishing, e.g. `beta`, `next`          |
| `-r, --remote <remote>`      | Git remote name for pushing                               |
| `--skip-npm-publish`         | Skip npm publish                                          |
| `--skip-changelog`           | Skip changelog generation                                 |
| `--skip-git-tag`             | Skip git tag                                              |
| `-c, --check-remote-version` | Skip publish if the current version already exists on npm |

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

## Priority

CLI arguments > config file (`rattail.release` in `vite.config.ts`) > defaults.

The merge logic in `src/cli/bin.ts` spreads config first, then overlays any CLI arguments on top.

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
