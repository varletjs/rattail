# 为什么选择 Rattail

## 问题

[Vite+](https://viteplus.dev) 很好地将构建、测试、代码检查、格式化收敛到了一个工具中。但在日常的企业级开发中，仍有一些事情需要自己去串联：

- **发布流程** — 版本号管理、npm 发布、Changelog 生成
- **Git Hooks** — 提交信息校验、lockfile 变更检测
- **API 代码生成** — 从 OpenAPI/Swagger Schema 生成类型安全的 API 模块
- **工具函数** — 字符串、数组、对象等每个项目都会用到的通用工具

这些需求各自需要独立的工具、独立的配置文件、独立的学习成本。时间久了，项目根目录堆满了各种配置碎片，维护兼容性也变成了负担。

## Rattail 做了什么

Rattail 尝试把这些零散的部分收敛到 `vite.config.ts` 中，和 Vite+ 放在一起：

```ts
import { defineConfig, lint, fmt, staged, hook, clean } from 'rattail/vite-plus'

export default defineConfig({
  lint: lint(),
  fmt: fmt(),
  staged: staged(),
  rattail: {
    clean: clean(),
    hook: hook(),
    release: {},
    changelog: {},
  },
})
```

一个文件同时管理 Vite+ 配置和周边工作流，项目根目录更干净。

## AI Agent 友好

一个越来越实际的考量——AI 编程助手在工具链内聚的情况下工作得更好：

- **单一依赖** — 只需要了解一个库，而不是一堆各有各 API 的工具。
- **统一的 Skills** — Rattail 提供 [Agent Skills](https://github.com/varletjs/rattail/tree/main/skills)，让 AI 助手一次性理解整个工具链。
- **一致的模式** — 每个 CLI 命令都是配置驱动，每个工具函数都遵循相同的导入约定。可预测的结构让生成的代码更可靠。
- **集中的上下文** — 所有相关知识在一处，不用在十几个独立的文档站点之间来回跳转。

## 设计原则

- **补充 Vite+** — Rattail 覆盖 Vite+ 有意不涉及的部分，而不是重复它已经做好的事情。
- **配置驱动** — CLI 命令从 `vite.config.ts` 读取配置，没有散落的配置文件。
- **渐进式采用** — `rattail/vite-plus` 提供预设，`rattail/cli` 提供命令行工具，`rattail` 提供工具函数。用什么取什么，不用的不引入。
- **合理的默认值** — 开箱即用，需要时可以自定义。
