---
category: Math
---

# meanBy

Calculate the mean (average) of an `array` by applying a function to each element to derive a numeric value.

## Documentation

- [English](https://rattail.varletjs.org/math/mean-by)
- [Chinese docs](https://rattail.varletjs.org/zh/math/mean-by)

### Usage

```ts
import { meanBy } from 'rattail'

meanBy([{ n: 4 }, { n: 6 }, { n: 8 }], ({ n }) => n)
// return 6
meanBy([10, 20, 30], (n) => n / 2)
// return 10
```

### Arguments

| Arg   |         Type         | Defaults |
| ----- | :------------------: | -------: |
| `arr` |        `T[]`         |          |
| `fn`  | `(val: T) => number` |          |

### Return

|   Type   |
| :------: |
| `number` |

## Type declarations

```ts
import { sumBy } from './sumBy'

export function meanBy<T>(arr: T[], fn: (val: T) => number) {
  return sumBy(arr, fn) / arr.length
}
```
