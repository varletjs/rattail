---
category: General
---

# isFunction

Determine whether the input value is a `function`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-function)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-function)

### Usage

```ts
import { isFunction } from 'rattail'

isFunction(() => {}) // return true
isFunction(123) // return false
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
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}
```
