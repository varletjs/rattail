---
category: General
---

# isWeakSet

Determine whether the input value is a `WeakSet`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-weak-set)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-weak-set)

### Usage

```ts
import { WeakSet } from 'rattail'

isWeakMap(new WeakSet()) // return true
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

export function isWeakSet(val: unknown): val is WeakSet<any> {
  return toRawType(val) === 'WeakSet'
}
```
