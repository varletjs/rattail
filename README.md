<div align="center">
  <a href="https://rattail.pages.dev">
    <img src="https://rattail.pages.dev/logo.svg" width="150">
  </a>
  <h1>Rattail</h1>
  <p>A utilities library for front-end developers, lightweight and ts-friendly.</p>
  <p>
    <a href="https://rattail.pages.dev">Documentation</a> |
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

- 🛠️ &nbsp; Provide utilities frequently used in daily development
- 🛠️ &nbsp; Utilities implementation is very lightweight
- 🛠️ &nbsp; Written based on ts, providing complete ts types
- 💪 &nbsp; Make sure more than 99% unit test coverage, providing stability assurance

### Installation

```shell
# npm
npm i rattail -S
# yarn
yarn add rattail
# pnpm
pnpm add rattail
```

### Usage

```ts
import { isString } from 'rattail'

isString('rattail') // return true
isString(123) // return false
```
