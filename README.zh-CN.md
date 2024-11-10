<div align="center">
  <a href="https://rattail.pages.dev/zh">
    <img src="https://rattail.pages.dev/logo.svg" width="150">
  </a>
  <h1>Rattail</h1>
  <p>面向前端开发人员的实用工具库，轻量级且 ts 友好</p>
  <p>
    <a href="https://rattail.pages.dev/zh">文档</a> |
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

- 🛠️ &nbsp; 提供日常开发中经常使用的实用工具
- 🛠️ &nbsp; 工具实现非常轻量
- 🛠️ &nbsp; 使用 ts 编写，提供完善的类型支持
- 💪 &nbsp; 确保 99% 以上单元测试覆盖率，提供稳定性保证

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
