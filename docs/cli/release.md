# release

Release all packages and generate changelogs.

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
| `remote` | `string` | - | Git remote name |
| `npmTag` | `string` | - | npm publish tag |
| `skipNpmPublish` | `boolean` | - | Skip npm publish |
| `skipChangelog` | `boolean` | - | Skip changelog generation |
| `skipGitTag` | `boolean` | - | Skip git tag |
| `checkRemoteVersion` | `boolean` | - | Check remote version before publish |
| `task` | `(newVersion, oldVersion) => Promise<void>` | - | Custom task to run during release |
