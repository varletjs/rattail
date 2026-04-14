---
category: General
---

# isEmptyPlainObject

Determine whether the input value is a empty(No own enumerable keys and no symbols) plain object.

## Documentation

- [English](https://rattail.varletjs.org/general/is-empty-plain-object)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-empty-plain-object)

### Usage

```ts
import { isEmptyPlainObject } from 'rattail'

isEmptyPlainObject({}) // return true
isEmptyPlainObject(Object.create(null)) // return true
isEmptyPlainObject([]) // return false
isEmptyPlainObject({ a: 1 }) // return false
isEmptyPlainObject({ [Symbol()]: 1 }) // return false
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
import { isPlainObject } from './isPlainObject'

export function isEmptyPlainObject(val: unknown): val is Record<string, any> {
  return isPlainObject(val) && Object.keys(val).length === 0 && Object.getOwnPropertySymbols(val).length === 0
}
```
