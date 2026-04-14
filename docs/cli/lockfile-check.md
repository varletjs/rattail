# lockfile-check

Check if lockfile has been updated and optionally install dependencies. Typically used with a `post-merge` git hook.

### Usage

```shell
rt lockfile-check -m pnpm -i
```

### Config

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    hook: {
      'post-merge': ['rt lockfile-check -i'],
    },
  },
})
```

### Programmatic Usage

```ts
import { lockfileCheck } from 'rattail/cli'

await lockfileCheck({ packageManager: 'pnpm', install: true })
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `packageManager` | `'npm' \| 'yarn' \| 'pnpm'` | - | Package manager |
| `install` | `boolean` | - | Auto install if lockfile changed |
