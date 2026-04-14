---
category: General
---

# isSet

Determine whether the input value is a `Set`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-set)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-set)

### Usage

```ts
import { isSet } from 'rattail'

isSet(new Set()) // return true
isSet({}) // return false
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

export function isSet(val: unknown): val is Set<any> {
  return toRawType(val) === 'Set'
}
```
