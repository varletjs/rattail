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
| `showTypes` | `string[]` | `[feat, fix, perf, revert, refactor]` | You can customize which types of commit messages are displayed in the `CHANGELOG.md`. For example, passing in `[feat, fix]` will only generate commit information for the `Features` and Bug `Fixes types`. You are free to combine any of the following types: `['feat', 'fix', 'perf', 'revert', 'refactor', 'docs', 'style', 'test', 'build', 'ci']` |
