# commit-lint

Lint commit message. Typically used with a `commit-msg` git hook.

### Usage

```shell
rt commit-lint -p $1
```

### Config

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    hook: {
      'commit-msg': ['rt commit-lint -p $1'],
    },
  },
})
```

### Programmatic Usage

```ts
import { commitLint } from 'rattail/cli'

commitLint({ commitMessagePath: '.git/COMMIT_EDITMSG' })
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `commitMessagePath` | `string` | - | Git commit message file path |
| `commitMessageRe` | `string \| RegExp` | - | Custom commit message regex |
| `errorMessage` | `string` | - | Custom error message |
| `warningMessage` | `string` | - | Custom warning message |
