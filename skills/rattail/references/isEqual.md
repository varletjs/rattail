---
category: General
---

# isEqual

Deeply compare two values.

## Documentation

- [English](https://rattail.varletjs.org/general/is-equal)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-equal)

### Usage

```ts
import { isEqual } from 'rattail'

isEqual({ n: 1 }, { n: 1 })
// return true
isEqual([1, 2, 3], [1, 2, 3])
// return true
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |
| `other` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |

## Type declarations

```ts
import { isEqualWith } from './isEqualWith'

export function isEqual(value: any, other: any): boolean {
  return isEqualWith(value, other, () => undefined)
}
```
