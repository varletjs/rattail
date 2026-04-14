---
category: General
---

# isPlainObject

Determine whether the input value is a `plain object`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-plain-object)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-plain-object)

### Usage

```ts
import { isPlainObject } from 'rattail'

isPlainObject({}) // return true
isPlainObject([]) // return false
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
import { toRawType } from './toRawType'

export function isPlainObject(val: unknown): val is Record<string, any> {
  return toRawType(val) === 'Object'
}
```
