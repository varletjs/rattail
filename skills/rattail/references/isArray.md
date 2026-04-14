---
category: General
---

# isArray

Determine whether the input value is an `array`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-array)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-array)

### Usage

```ts
import { isArray } from 'rattail'

isArray([]) // return true
isArray({}) // return false
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
export function isArray(val: unknown): val is any[] {
  return Array.isArray(val)
}
```
