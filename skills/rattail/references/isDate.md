---
category: General
---

# isDate

Determine whether the input value is a `Date`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-date)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-date)

### Usage

```ts
import { isDate } from 'rattail'

isDate(new Date()) // return true
isDate('2024-01-01') // return false
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

export function isDate(val: unknown): val is Date {
  return toRawType(val) === 'Date'
}
```
