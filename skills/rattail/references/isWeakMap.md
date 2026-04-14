---
category: General
---

# isWeakMap

Determine whether the input value is a `WeakMap`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-weak-map)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-weak-map)

### Usage

```ts
import { isWeakMap } from 'rattail'

isWeakMap(new WeakMap()) // return true
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

export function isWeakMap(val: unknown): val is WeakMap<any, any> {
  return toRawType(val) === 'WeakMap'
}
```
