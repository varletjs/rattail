<div align="center">
  <a href="https://rattail.varletjs.org/zh">
    <img src="https://rattail.varletjs.org/logo.svg" width="150">
  </a>
  <h1>Rattail</h1>
  <p>前端工具链，包含工具函数、配置预设、请求工具和 CLI</p>
  <p>
    <a href="https://rattail.varletjs.org/zh">文档</a> |
    <a href="https://github.com/varletjs/rattail/blob/main/README.md">ENGLISH README</a>
  </p>
  <p>
    <img src="https://img.shields.io/npm/v/rattail?style=flat-square" alt="version">
    <img src="https://img.shields.io/github/stars/varletjs/rattail" alt="stars">
    <img src="https://img.shields.io/npm/l/rattail.svg" alt="license">
    <img src="https://img.shields.io/codecov/c/github/varletjs/rattail" alt="coverage">
    <img src="https://github.com/varletjs/varlet/workflows/CI/badge.svg" alt="ci">
  </p>
</div>

---

### 特性

- 🧰 &nbsp; 140+ 工具函数，覆盖通用、字符串、数字、数组、对象、数学等场景
- 🔧 &nbsp; CLI 工具链，支持发布、日志、Git Hooks、Commit Lint、API 生成
- ⚙️ &nbsp; 开箱即用的 Oxlint + Oxfmt 配置预设，支持 Vite+ 集成
- 🚀 &nbsp; 基于 axios 的渐进式请求工具，支持 Vue 组合式 API
- 📏 &nbsp; 链式校验规则工厂，适配任意 UI 框架
- 🏷️ &nbsp; 类型安全的枚举工具，内置 label、description，支持自定义字段扩展
- 🌲 &nbsp; 可 Tree-shake，轻量，TypeScript 完整类型支持
- 💪 &nbsp; 99%+ 单元测试覆盖率

### 安装

```shell
# npm
npm i rattail -S
# yarn
yarn add rattail
# pnpm
pnpm add rattail
```

### 使用

```ts
import { isString } from 'rattail'

isString('rattail') // return true
isString(123) // return false
```
