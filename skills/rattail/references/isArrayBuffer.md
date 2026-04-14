---
category: General
---

# isArrayBuffer

Determine whether the input value is a `ArrayBuffer`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-array-buffer)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-array-buffer)

### Usage

```ts
import { isArrayBuffer } from 'rattail'

isArrayBuffer(new ArrayBuffer(8)) // return true
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

export function isArrayBuffer(val: unknown): val is ArrayBuffer {
  return toRawType(val) === 'ArrayBuffer'
}
```
