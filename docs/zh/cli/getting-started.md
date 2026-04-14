# CLI 快速开始

## 总览

Rattail 提供了 CLI 工具 `rt`，用于常见的开发任务，如清理构建产物、生成 API 模块、安装 git hooks、发布包等。CLI 面向 [Vite+](https://viteplus.dev) 项目设计，因此使用 `vite.config.ts` 作为配置文件。

### 配置

在 `vite.config.ts` 中使用 `rattail/vite-plus` 导出的 `defineConfig` 进行配置。如果不想关心细节，我们也提供了开箱即用的完整预设，详见 [Presets](/zh/vite-plus/presets)。

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    clean: ['dist', 'node_modules/.cache'],

    hook: {
      'commit-msg': ['rt commit-lint $1'],
      'post-merge': ['rt lockfile-check'],
    },

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
只有从 `rattail/vite-plus` 导出的 `defineConfig` 才提供 `rattail` 字段的类型提示。如果需要 CLI 配置的类型支持，请勿直接使用 `vite-plus` 的 `defineConfig`。
:::

### 命令

| 命令 | 描述 |
| --- | --- |
| `rt clean` | 删除文件和目录 |
| `rt api` | 解析 OpenAPI/Swagger schema 生成 API 模块 |
| `rt hook` | 从配置安装 git hooks |
| `rt release` | 发布所有包并生成 changelogs |
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
