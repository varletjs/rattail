---
category: General
---

# getGlobalThis

Retrieve the global object based on the current environment.

## Documentation

- [English](https://rattail.varletjs.org/general/get-global-this)
- [Chinese docs](https://rattail.varletjs.org/zh/general/get-global-this)

### Usage

```ts
import { getGlobalThis } from 'rattail'

getGlobalThis()
// returns `window` in browser, `global` in Node.js,
// or `self` in web worker
```

### Return

|        Type         |
| :-----------------: |
| `typeof globalThis` |

## Type declarations

```ts
import { inBrowser } from './inBrowser'

export function getGlobalThis() {
  if (typeof globalThis !== 'undefined') {
    return globalThis
  }

  if (inBrowser()) {
    return window
  }

  return typeof global !== 'undefined' ? global : self
}
```
