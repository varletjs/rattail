---
category: Number
---

# toNumber

Convert the input value to a `number`. If the value is `null` or `undefined`, it returns `0`. If the value is a boolean, it converts `true` to `1` and `false` to `0`. If the value is a string that cannot be parsed as a number, it returns `0`.

## Documentation

- [English](https://rattail.varletjs.org/number/to-number)
- [Chinese docs](https://rattail.varletjs.org/zh/number/to-number)

### Usage

```ts
import { toNumber } from 'rattail'

toNumber('123') // return 123
toNumber(true) // return 1
toNumber(false) // return 0
toNumber('abc') // return 0
toNumber(null) // return 0
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type   |
| :------: |
| `number` |

## Type declarations

```ts
import { isBoolean, isString } from '../general'

export function toNumber(val: number | string | boolean | undefined | null): number {
  if (val == null) {
    return 0
  }

  if (isString(val)) {
    val = parseFloat(val)
    val = Number.isNaN(val) ? 0 : val
    return val
  }

  if (isBoolean(val)) {
    return Number(val)
  }

  return val
}
```
