---
category: General
---

# isEmpty

Determine whether the input value is empty (`undefined`, `null`, an `empty string`, or an `empty array`).

## Documentation

- [English](https://rattail.varletjs.org/general/is-empty)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-empty)

### Usage

```ts
import { isEmpty } from 'rattail'

isEmpty(null) // return true
isEmpty('') // return true
isEmpty([]) // return true
isEmpty([1, 2, 3]) // return false
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
import { isArray } from './isArray'

export function isEmpty(val: unknown) {
  return val === undefined || val === null || val === '' || (isArray(val) && !val.length)
}
```
