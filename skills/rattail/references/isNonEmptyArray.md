---
category: General
---

# isNonEmptyArray

Determine whether the input value is a `non-empty array`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-non-empty-array)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-non-empty-array)

### Usage

```ts
import { isNonEmptyArray } from 'rattail'

isNonEmptyArray([1, 2, 3]) // return true
isNonEmptyArray([]) // return false
isNonEmptyArray(1) // return false
isNonEmptyArray(null) // return false
isNonEmptyArray(undefined) // return false
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
import { isArray } from './isArray'

export function isNonEmptyArray(val: unknown): val is any[] {
  return isArray(val) && !!val.length
}
```
