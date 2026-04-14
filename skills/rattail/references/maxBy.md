---
category: Math
---

# maxBy

Find the maximum value in an array based on the result of applying a function to each element. If the array is empty, `undefined` is returned.

## Documentation

- [English](https://rattail.varletjs.org/math/max-by)
- [Chinese docs](https://rattail.varletjs.org/zh/math/max-by)

### Usage

```ts
import { maxBy } from 'rattail'

maxBy([{ n: 5 }, { n: 10 }, { n: 8 }], ({ n }) => n)
// return { n: 10 }
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
export function maxBy<T>(arr: T[], fn: (val: T) => number) {
  return arr.reduce((result, item) => (fn(result) > fn(item) ? result : item), arr[0])
}
```
