# release

Interactive package release.

### Usage

```shell
rt release
```

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
