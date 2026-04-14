---
category: General
---

# isTruthy

Determine whether the input value is `truthy`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-truthy)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-truthy)

### Usage

```ts
import { isTruthy } from 'rattail'

isTruthy(1) // return true
isTruthy([]) // return true
isTruthy({}) // return true
isTruthy(0) // return false
isTruthy('') // return false
isTruthy(null) // return false
isTruthy(undefined) // return false
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
export function isTruthy<T>(v: T): v is NonNullable<T> {
  return Boolean(v)
}
```
