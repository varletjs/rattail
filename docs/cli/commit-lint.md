# commit-lint

Validate commit messages against conventions, automatically rejecting non-conforming commits to keep the team's commit history clean and consistent.

### Rules

Commit messages must follow the `type(scope?): message` format:

```
feat: add a new feature
feat(ui/button): add a new feature in the ui/button scope

fix: fix a bug
fix(ui/button): fix a bug in the ui/button scope
```

Allowed types:

`fix` `feat` `docs` `perf` `test` `types` `style` `build` `chore` `release` `refactor` `revert` `merge` `wip`

### Usage

```shell
rt commit-lint $1
```

### Config

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    hook: {
      'commit-msg': ['rt commit-lint $1'],
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
