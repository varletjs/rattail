---
category: General
---

# isError

Determine whether the input value is an `Error` object.

## Documentation

- [English](https://rattail.varletjs.org/general/is-error)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-error)

### Usage

```ts
import { isError } from 'rattail'

isError(new Error('message')) // return true
```

### Arguments

| Arg   | Type  | Defaults |
| ----- | :---: | -------: |
| `val` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |

## Type declarations

```ts
import { toRawType } from './toRawType'

export function isError(val: unknown): val is Error {
  return toRawType(val) === 'Error'
}
```
