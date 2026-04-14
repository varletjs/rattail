---
category: General
---

# isMap

Determine whether the input value is a `Map`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-map)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-map)

### Usage

```ts
import { isMap } from 'rattail'

isMap(new Map()) // return true
isMap({}) // return false
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

export function isMap(val: unknown): val is Map<any, any> {
  return toRawType(val) === 'Map'
}
```
