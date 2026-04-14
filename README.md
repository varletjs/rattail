<div align="center">
  <a href="https://rattail.varletjs.org">
    <img src="https://rattail.varletjs.org/logo.svg" width="150">
  </a>
  <h1>Rattail</h1>
  <p>A front-end toolchain with utilities, presets, request tools, and CLI</p>
  <p>
    <a href="https://rattail.varletjs.org">Documentation</a> |
    <a href="https://github.com/varletjs/rattail/blob/main/README.zh-CN.md">中文介绍</a>
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

### Features

- 🧰 &nbsp; 140+ utility functions for general, string, number, array, object, math, and more
- 🔧 &nbsp; CLI toolkit for release, changelog, git hooks, commit lint, and API codegen
- ⚙️ &nbsp; Opinionated Oxlint + Oxfmt presets with Vite+ integration
- 🚀 &nbsp; Progressive HTTP client based on axios, with Vue Composition API support
- 📏 &nbsp; Chainable validation rule factory that adapts to any UI framework
- 🏷️ &nbsp; Type-safe enums with built-in label, description, and custom field support
- 🌲 &nbsp; Tree-shakable, lightweight, and fully typed with TypeScript
- 💪 &nbsp; 99%+ unit test coverage

### Installation

```shell
# npm
npm i rattail -S
# yarn
yarn add rattail
# pnpm
pnpm add rattail
```

### Quick Examples

```ts
import { enumOf } from 'rattail'

const Status = enumOf({
  Active: { value: 1, label: 'Active', color: 'green' },
  Inactive: { value: 2, label: 'Inactive', color: 'gray' },
})

Status.Active // 1
Status.label(1) // 'Active'
Status.options() // [{ value: 1, label: 'Active', color: 'green' }, ...]
```

```ts
import { rulerFactory } from 'rattail/ruler'

const r = rulerFactory((validator) => (value) => {
  const e = validator(value)
  return e ? e.message : true
})

r().required('Required').email('Invalid email').done()
```

```ts
import { createAxle } from 'rattail/axle'

const axle = createAxle()
axle.get('/users', { page: 1, size: 10 })
axle.post('/users', { name: 'Rattail' })
```
