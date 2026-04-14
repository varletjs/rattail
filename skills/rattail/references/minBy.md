---
category: Math
---

# minBy

Find the `minimum` value in an `array` based on the result of applying a function to each element. If the array is empty, `undefined` is returned.

## Documentation

- [English](https://rattail.varletjs.org/math/min-by)
- [Chinese docs](https://rattail.varletjs.org/zh/math/min-by)

### Usage

```ts
import { minBy } from 'rattail'

minBy([{ n: 5 }, { n: 2 }, { n: 8 }], ({ n }) => n)
// return { n: 2 }
```

### Arguments

| Arg   |         Type         | Defaults |
| ----- | :------------------: | -------: |
| `arr` |        `T[]`         |          |
| `fn`  | `(val: T) => number` |          |

### Return

|       Type        |
| :---------------: |
| `T  \| undefined` |

## Type declarations

```ts
export function minBy<T>(arr: T[], fn: (val: T) => number) {
  return arr.reduce((result, item) => (fn(result) < fn(item) ? result : item), arr[0])
}
```
