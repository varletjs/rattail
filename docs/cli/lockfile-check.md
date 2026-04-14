# lockfile-check

Automatically detect lockfile changes after pulling code and install dependencies if needed, preventing runtime errors caused by out-of-sync dependencies.

Supported lockfiles:

- `pnpm-lock.yaml`
- `yarn.lock`
- `package-lock.json`

### Usage

```shell
rt lockfile-check
```

### Config

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    hook: {
      'post-merge': ['rt lockfile-check'],
    },
  },
})
```

### Programmatic Usage

```ts
import { lockfileCheck } from 'rattail/cli'

await lockfileCheck({ packageManager: 'pnpm' })
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `packageManager` | `'npm' \| 'yarn' \| 'pnpm'` | `'pnpm'` | Package manager |
| `skipInstall` | `boolean` | `false` | Skip auto-install when lockfile changed |
