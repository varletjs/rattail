---
category: Math
---

# sumBy

Calculates the sum of values in an `array` based on a provided function.

## Documentation

- [English](https://rattail.varletjs.org/math/sum-by)
- [Chinese docs](https://rattail.varletjs.org/zh/math/sum-by)

### Usage

```ts
import { sumBy } from 'rattail'

sumBy([{ n: 1 }, { n: 2 }, { n: 3 }], ({ n }) => n) // return 6
```

### Arguments

| Arg   | Type                   | Defaults |
| ----- | ---------------------- | -------- |
| `arr` | `Array`                |          |
| `fn`  | `(val: any) => number` |          |

### Return

| Type     |
| -------- |
| `number` |

## Type declarations

```ts
export function sumBy<T>(arr: T[], fn: (val: T) => number) {
  return arr.reduce((ret, val) => ret + fn(val), 0)
}
```
