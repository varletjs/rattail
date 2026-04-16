# release

Publish workspace npm packages and generate changelogs.

### Usage

```shell
rt release
rt release --skip-npm-publish
rt release --npm-tag beta
rt release --skip-changelog --skip-git-tag
rt release --check-remote-version --remote upstream
```

### CLI Arguments

All options can be passed as command-line arguments. CLI arguments take priority over config file options.

| Argument | Description |
| --- | --- |
| `-t, --npm-tag <tag>` | npm dist-tag for publishing, e.g. `beta`, `next` |
| `-r, --remote <remote>` | Git remote name for pushing |
| `--skip-npm-publish` | Skip npm publish |
| `--skip-changelog` | Skip changelog generation |
| `--skip-git-tag` | Skip git tag |
| `-c, --check-remote-version` | Exit if the current version already exists on npm |

### Config

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    release: {
      // skipNpmPublish: true,
      // skipChangelog: true,
    },
  },
})
```

### Programmatic Usage

```ts
import { release } from 'rattail/cli'

await release({
  // skipNpmPublish: true,
  // skipChangelog: true,
})
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `npmTag` | `string` | - | npm dist-tag for publishing, e.g. `beta`, `next`. Defaults to `latest` if not set |
| `skipNpmPublish` | `boolean` | - | Skip npm publish |
| `skipChangelog` | `boolean` | - | Skip changelog generation |
| `skipGitTag` | `boolean` | - | Skip git tag |
| `checkRemoteVersion` | `boolean` | - | Check npm remote version before publishing, skip if version already exists |
| `task` | `(newVersion, oldVersion) => Promise<void>` | - | Custom task to run after version update but before npm publish, e.g. build |
| `remote` | `string` | `origin` | Git remote name for pushing, rarely needs to be changed |
