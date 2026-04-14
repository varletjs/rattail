---
category: General
---

# inBrowser

Determine whether the code is running in a `browser` environment.

## Documentation

- [English](https://rattail.varletjs.org/general/in-browser)
- [Chinese docs](https://rattail.varletjs.org/zh/general/in-browser)

### Usage

```ts
import { inBrowser } from 'rattail'

inBrowser() // return true in browser
```

### Return

|   Type    |
| :-------: |
| `boolean` |

## Type declarations

```ts
export function inBrowser() {
  return typeof window !== 'undefined'
}
```
