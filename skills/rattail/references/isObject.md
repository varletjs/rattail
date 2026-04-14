---
category: General
---

# isObject

Determine whether the input value is an `object` (excluding `null`).

## Documentation

- [English](https://rattail.varletjs.org/general/is-object)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-object)

### Usage

```ts
import { isObject } from 'rattail'

isObject({}) // return true
isObject([]) // return true
isObject(null) // return false
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
export function isObject(val: unknown): val is Record<string, any> {
  return typeof val === 'object' && val !== null
}
```
