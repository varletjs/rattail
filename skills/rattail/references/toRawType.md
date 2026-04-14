---
category: General
---

# toRawType

Return the `raw type` of the input value.

## Documentation

- [English](https://rattail.varletjs.org/general/to-raw-type)
- [Chinese docs](https://rattail.varletjs.org/zh/general/to-raw-type)

### Usage

```ts
import { toRawType } from 'rattail'

toRawType({}) // return 'Object'
toRawType([]) // return 'Array'
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type   |
| :------: |
| `string` |

## Type declarations

```ts
import { toTypeString } from './toTypeString'

export function toRawType(value: unknown): string {
  return toTypeString(value).slice(8, -1)
}
```
