# Presets

开箱即用的工具预设。

### 特性

- `lint()`：[Oxlint](https://oxc.rs/docs/guide/usage/linter) 配置预设，内置 TypeScript、Vue 3、Vitest 支持，可选 React
- `fmt()`：[Oxfmt](https://oxc.rs/docs/guide/usage/formatter) 格式化预设，支持 import 排序和 Tailwind CSS class 排序
- `staged()`：开箱即用的 lint-staged 预设，自动对暂存文件执行格式化和 lint 修复
- `hook()`：Git hooks 预设，默认启用 commit-lint 和 lockfile-check
- `clean()`：默认清理路径预设，用于 CLI 的 `rt clean` 命令

### 在 Vite+ 中使用

推荐在 [Vite+](https://viteplus.dev) 中使用，`defineConfig` 扩展了 Vite+ 的 `defineConfig`，增加了 `rattail` 字段用于 [CLI](/zh/cli/getting-started) 配置：

```ts
import {
  defineConfig,
  lint, fmt, staged,
  hook, clean,
} from 'rattail/vite-plus'

export default defineConfig({
  lint: lint(),

  fmt: fmt(),

  staged: staged(),

  rattail: {
    clean: clean(),

    hook: hook(),
  },
})
```

### 独立使用

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

### Lint 选项

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

### Fmt 选项

```ts
fmt({
  // 忽略文件模式
  ignores: ['**/generated/**'],
})
```

### Staged

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

- `js / jsx / ts / tsx / vue` — 格式化 + lint 修复
- `md / json / yaml / yml / html / css / scss / less` — 仅格式化

### hook

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

如果预设不满足需求，也可以完全自定义 `hook` 配置：

```ts
hook: {
  'commit-msg': ['rt commit-lint $1'],
  'pre-push': ['vp lint'],
}
```

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `commitLint` | `boolean` | `true` | 启用 commit-msg hook |
| `lockfileCheck` | `boolean` | `true` | 启用 post-merge hook |

### clean

`clean()` 提供了一组默认的清理路径，用于 [CLI](/zh/cli/clean)：

```ts
import { clean } from 'rattail/vite-plus'

clean()
// { patterns: ['**/node_modules', '**/dist', '**/coverage'] }

clean({ patterns: ['**/temp'] })
// { patterns: ['**/node_modules', '**/dist', '**/coverage', '**/temp'] }
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
