---
category: General
---

# isNumber

Determine whether the input value is a `number`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-number)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-number)

### Usage

```ts
import { isNumber } from 'rattail'

isNumber(123) // return true
isNumber('rattail') // return false
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
export function isNumber(val: unknown): val is number {
  return typeof val === 'number'
}
```
