---
category: Math
---

# floor

Return number rounded down to precision.

## Documentation

- [English](https://rattail.varletjs.org/math/floor)
- [Chinese docs](https://rattail.varletjs.org/zh/math/floor)

### Usage

```ts
import { floor } from 'rattail'

floor(1.005) // return 1
floor(1.0015, 3) // return 1.001
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
import { baseRound } from './round'

export function floor(val: number, precision: number = 0) {
  return baseRound(val, precision, Math.floor)
}
```
