# CLI 快速开始

## 总览

Rattail 提供了面向 [Vite+](https://viteplus.dev) 项目的 CLI 工具 `rt`，使用 `vite.config.ts` 作为配置文件。

```shell
rt clean          # 清理文件和目录
rt api            # 解析 OpenAPI/Swagger schema 生成 API 模块
rt hook           # 从配置安装 git hooks
rt release        # 发布工作区的 npm 包并生成 changelogs
rt changelog      # 生成 changelog
rt commit-lint    # 校验 commit 信息
rt lockfile-check # 检查 lockfile 是否更新
```

### 配置

在 `vite.config.ts` 中配置：

```ts
import {
  defineConfig,
  lint,
  fmt,
  staged,
  hook,
  clean,
} from 'rattail/vite-plus'

export default defineConfig({
  lint: lint(),

  fmt: fmt(),

  staged: staged(),

  rattail: {
    // rt clean 命令选项，详见 rt clean 文档
    clean: clean(),

    // rt hook 命令选项，详见 rt hook 文档
    hook: hook(),

    // rt api 命令选项，详见 rt api 文档
    api: {
      input: './openapi.json',
      output: './src/apis',
    },

    // rt release 命令选项，详见 rt release 文档
    release: {},

    // rt changelog 命令选项，详见 rt changelog 文档
    changelog: {},
  },
})
```

::: tip
只有从 `rattail/vite-plus` 导出的 `defineConfig` 才提供 `rattail` 字段的类型提示。
:::

### Presets

开箱即用的工具预设：

- `lint()`：[Oxlint](https://oxc.rs/docs/guide/usage/linter) 配置预设，内置 `TypeScript`、`Vue 3`、`Vitest` 支持，可选 `React`。
- `fmt()`：[Oxfmt](https://oxc.rs/docs/guide/usage/formatter) 格式化预设，支持 `import 排序` 和 `Tailwind CSS class 排序`。
- `staged()`：开箱即用的 `lint-staged` 预设，自动对暂存文件执行格式化和 lint 修复。
- `hook()`：`Git hooks` 预设，默认启用 `commit-lint` 和 `lockfile-check`。
- `clean()`：默认清理路径预设，用于 `rt clean` 命令。

#### 独立使用

在项目根目录创建 `oxlint.config.ts`：

```ts
import { lint } from 'rattail/vite-plus'

export default lint()
```

在项目根目录创建 `oxfmt.config.ts`：

```ts
import { fmt } from 'rattail/vite-plus'

export default fmt()
```

#### lint

```ts
lint({
  // 启用 TypeScript 支持（默认：true）
  ts: true,
  // 启用 Vue 支持，默认 Vue 3（默认：true）
  vue: true, // 或 { version: 2 }
  // 启用 React 支持（默认：false）
  react: false,
  // 启用 Vitest 支持（默认：true）
  vitest: true,
  // 自定义规则
  rules: {
    'no-console': 'error',
  },
  // 额外的 overrides
  overrides: [
    {
      files: ['scripts/**'],
      rules: { 'no-console': 'off' },
    },
  ],
})
```

#### fmt

```ts
fmt({
  // 忽略文件模式
  ignores: ['**/generated/**'],
})
```

#### Staged

`staged()` 返回一个预设的 lint-staged 配置：

```ts
staged()
// 等同于：
// {
//   '*.{js,jsx,ts,tsx}': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix'],
//   '*.{md,json,yaml,yml,html,css,scss,less}': 'vp fmt --no-error-on-unmatched-pattern',
//   '*.vue': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix'],
// }
```


#### hook

`hook()` 返回一个预设的 git hooks 配置，默认启用 `commit-lint` 和 `lockfile-check`：

```ts
import { hook } from 'rattail/vite-plus'

hook()
// {
//   'commit-msg': ['rt commit-lint $1'],
//   'post-merge': ['rt lockfile-check'],
// }
```

如果不需要某个 hook，可以通过选项关闭：

```ts
hook({ commitLint: false })
hook({ lockfileCheck: false })
```

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `commitLint` | `boolean` | `true` | 启用 commit-msg hook |
| `lockfileCheck` | `boolean` | `true` | 启用 post-merge hook |

#### clean

`clean()` 提供了一组默认的清理路径，用于 [rt clean](/zh/cli/clean)：

```ts
import { clean } from 'rattail/vite-plus'

clean()
// { patterns: ['**/node_modules', '**/dist', '**/coverage'] }

clean({ patterns: ['**/temp'] })
// { patterns: ['**/node_modules', '**/dist', '**/coverage', '**/temp'] }
```

### 命令

| 命令 | 描述 |
| --- | --- |
| `rt clean` | 清理文件和目录 |
| `rt api` | 解析 OpenAPI/Swagger schema 生成 API 模块 |
| `rt hook` | 从配置安装 git hooks |
| `rt release` | 发布工作区的 npm 包并生成 changelogs |
| `rt changelog` | 生成 changelog |
| `rt commit-lint` | 校验 commit 信息 |
| `rt lockfile-check` | 检查 lockfile 是否更新 |

### 编程式使用

所有 CLI 命令也可以通过编程方式使用：

```ts
import {
  clean,
  api,
  hook,
  release,
  changelog,
  commitLint,
  lockfileCheck,
} from 'rattail/cli'
```

### VSCode 工作区配置

在 `.vscode/settings.json` 中添加：

```jsonc
{
  "prettier.enable": false,
  "eslint.enable": false,
  "editor.defaultFormatter": "oxc.oxc-vscode",
}
```
