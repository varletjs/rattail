---
category: General
---

# isWindow

Determine whether the input value is the global `window` object.

## Documentation

- [English](https://rattail.varletjs.org/general/is-window)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-window)

### Usage

```ts
import { isWindow } from 'rattail'

isWindow(window) // return true
isWindow({}) // return false
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |

## Type declarations

```ts
export function isWindow(val: unknown): val is Window {
  return val === window
}
```
