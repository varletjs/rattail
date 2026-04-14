---
category: Math
---

# ceil

Return number rounded up to precision.

## Documentation

- [English](https://rattail.varletjs.org/math/ceil)
- [Chinese docs](https://rattail.varletjs.org/zh/math/ceil)

### Usage

```ts
import { ceil } from 'rattail'

ceil(1.004) // return 2
ceil(1.004, 2) // return 1.01
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

export function ceil(val: number, precision: number = 0) {
  return baseRound(val, precision, Math.ceil)
}
```
