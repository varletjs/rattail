---
category: General
---

# isBlob

Determine whether the input value is a `Blob`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-blob)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-blob)

### Usage

```ts
import { isBlob } from 'rattail'

isBlob(new Blob(['Hello, World!'], { type: 'text/plain' })) // return true
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

export function isBlob(val: unknown): val is Blob {
  return toRawType(val) === 'Blob'
}
```
