# hook

从配置安装 git hooks。自动识别 Vite+ 的 git hooks 目录并挂载配置中声明的 hooks。

### 使用

```shell
rt hook
```

建议在 `package.json` 的 `prepare` 脚本中同时配置 hooks 目录和挂载 hooks，这样团队成员在安装依赖后即可自动生效：

```json
{
  "scripts": {
    "prepare": "vp config --hooks-dir .vite-hooks && rt hook"
  }
}
```

### 配置

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

### 编程式使用

```ts
import { hook } from 'rattail/cli'

await hook()
```
