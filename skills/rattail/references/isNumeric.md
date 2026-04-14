---
category: General
---

# isNumeric

Determine whether the input value is a `number` or a `numeric string`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-numeric)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-numeric)

### Usage

```ts
import { isNumeric } from 'rattail'

isNumeric(123) // return true
isNumeric('456') // return true
isNumeric('rattail') // return false
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
import { isNumber } from './isNumber'
import { isString } from './isString'

export function isNumeric(val: unknown): val is number | string {
  return isNumber(val) || (isString(val) && /^[-+]?\d+$/.test(val))
}
```
