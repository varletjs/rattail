---
category: Math
---

# sum

Calculates the sum of values in an `array` of numbers.

## Documentation

- [English](https://rattail.varletjs.org/math/sum)
- [Chinese docs](https://rattail.varletjs.org/zh/math/sum)

### Usage

```ts
import { sum } from 'rattail'

sum([1, 2, 3]) // return 6
```

### Arguments

| Arg   | Type       | Defaults |
| ----- | ---------- | -------- |
| `arr` | `number[]` |          |

### Return

| Type     |
| -------- |
| `number` |

## Type declarations

```ts
export function sum(arr: number[]) {
  return arr.reduce((ret, val) => ret + val, 0)
}
```
