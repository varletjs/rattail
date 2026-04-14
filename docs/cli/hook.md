# hook

Install git hooks from config. Automatically detects the Vite+ git hooks directory and mounts the hooks declared in the configuration.

### Usage

```shell
rt hook
```

It is recommended to configure the hooks directory and mount hooks together in the `prepare` script of `package.json`, so that hooks are automatically set up for all team members after installing dependencies:

```json
{
  "scripts": {
    "prepare": "vp config --hooks-dir .vite-hooks && rt hook"
  }
}
```

### Config

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    hook: {
      'applypatch-msg': [],
      'pre-applypatch': [],
      'post-applypatch': [],
      'pre-commit': [],
      'pre-merge-commit': [],
      'prepare-commit-msg': [],
      'commit-msg': ['rt commit-lint $1'],
      'post-commit': [],
      'pre-rebase': [],
      'post-checkout': [],
      'post-merge': ['rt lockfile-check'],
      'pre-push': [],
      'pre-auto-gc': [],
      'post-rewrite': [],
    },
  },
})
```

### Programmatic Usage

```ts
import { hook } from 'rattail/cli'

await hook()
```
