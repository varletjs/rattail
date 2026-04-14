---
category: Math
---

# round

Return number rounded to precision.

## Documentation

- [English](https://rattail.varletjs.org/math/round)
- [Chinese docs](https://rattail.varletjs.org/zh/math/round)

### Usage

```ts
import { round } from 'rattail'

round(1.005) // return 1
round(1.005, 2) // return 1.01
```

### Arguments

| Arg         |   Type   | Defaults |
| ----------- | :------: | -------: |
| `val`       | `number` |          |
| `precision` | `number` |      `0` |

### Return

|   Type   |
| :------: |
| `number` |

## Type declarations

```ts
import { clamp } from '../number'

export function round(val: number, precision: number = 0) {
  return baseRound(val, precision, Math.round)
}

export function baseRound(val: number, precision: number, fn: (val: number) => number) {
  precision = clamp(precision ?? 0, -292, 292)

  if (!precision) {
    return fn(val)
  }

  const value = fn(`${val}e${precision}` as any)
  return +`${value}e${-precision}`
}
```
