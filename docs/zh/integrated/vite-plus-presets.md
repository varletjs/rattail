# vite-plus-presets

为 [Vite+](https://viteplus.dev) 项目提供的开箱即用 [Oxlint](https://oxc.rs/docs/guide/usage/linter) + [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) 配置预设，集成自 [@configurajs/vite-plus](https://github.com/configurajs/vite-plus)。

### 特性

- TypeScript（默认开启）
- Vue 3（默认开启）
- React（按需开启）
- Vitest（默认开启）
- 类型感知 lint
- Oxfmt 格式化，支持 import 排序和 Tailwind CSS class 排序
- 开箱即用的 lint-staged 预设

### 使用

#### Oxc 配置文件

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

#### Vite+ 配置文件

如果你使用的是 [Vite+](https://viteplus.dev)，可以直接在 `vite.config.ts` 中配置 lint 和 fmt：

```ts
import { defineConfig } from 'vite-plus'
import { lint, fmt, staged } from 'rattail/vite-plus'

export default defineConfig({
  lint: lint(),
  fmt: fmt(),
  staged: staged(),
})
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
//   '*.{js,jsx,ts,tsx,vue}': ['vp fmt --no-error-on-unmatched-pattern', 'vp lint --fix'],
//   '*.{md,json,yaml,yml,html,css,scss,less}': 'vp fmt --no-error-on-unmatched-pattern',
// }
```

- `js / jsx / ts / tsx / vue` — 格式化 + lint 修复
- `md / json / yaml / yml / html / css / scss / less` — 仅格式化

### VSCode 工作区配置

在 `.vscode/settings.json` 中添加：

```jsonc
{
  "prettier.enable": false,
  "eslint.enable": false,
  "editor.defaultFormatter": "oxc.oxc-vscode",
}
```

### 参考

[@configurajs/vite-plus](https://github.com/configurajs/vite-plus/blob/main/README.zh-CN.md)
