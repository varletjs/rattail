---
category: Math
---

# mean

Calculate the `mean` (average) of an `array` of `numbers`.

## Documentation

- [English](https://rattail.varletjs.org/math/mean)
- [Chinese docs](https://rattail.varletjs.org/zh/math/mean)

### Usage

```ts
import { mean } from 'rattail'

mean([1, 2, 3, 4, 5]) // return 3
mean([10, 20, 30]) // return 20
```

### Arguments

| Arg   |    Type    | Defaults |
| ----- | :--------: | -------: |
| `arr` | `number[]` |          |

### Return

|   Type   |
| :------: |
| `number` |

## Type declarations

```ts
import { sum } from './sum'

export function mean(arr: number[]) {
  return sum(arr) / arr.length
}
```
