# clean

Clean up files in the project.

### Usage

```shell
rt clean dist node_modules/.cache "src/**/*.log"
```

If no patterns are provided, the command reads from the `rattail.clean` config.

### Config

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    // string | string[] | { patterns: string[] }
    clean: ['dist', 'node_modules/.cache', 'src/**/*.log'],
  },
})
```

### Programmatic Usage

```ts
import { clean } from 'rattail/cli'

await clean(['dist', 'node_modules/.cache', 'src/**/*.log'])
```
