# changelog

Generate changelog.

### Usage

```shell
rt changelog
```

### Config

This configuration only affects the `rt changelog` command and does not affect the changelog process within `rt release`.

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    changelog: {
      // releaseCount: 3,
      // file: './CHANGELOG.md',
    },
  },
})
```

### Programmatic Usage

```ts
import { changelog } from 'rattail/cli'

await changelog({
  // releaseCount: 3,
  // file: './CHANGELOG.md',
})
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `file` | `string` | - | Output file path |
| `releaseCount` | `number` | `0` | Number of releases to generate, `0` means all |
| `showTypes` | `string[]` | - | Commit types to include (e.g. `'feat'`, `'fix'`, `'perf'`) |
