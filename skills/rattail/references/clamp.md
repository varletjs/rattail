---
category: Number
---

# clamp

Clamp a number within the inclusive `min` and `max` bounds. If the number is less than `min`, it returns `min`; if it's greater than `max`, it returns `max`.

## Documentation

- [English](https://rattail.varletjs.org/number/clamp)
- [Chinese docs](https://rattail.varletjs.org/zh/number/clamp)

### Usage

```ts
import { clamp } from 'rattail'

clamp(5, 1, 10) // return 5
clamp(0, 1, 10) // return 1
clamp(15, 1, 10) // return 10
```

### Arguments

| Arg   |   Type   | Defaults |
| ----- | :------: | -------: |
| `num` | `number` |          |
| `min` | `number` |          |
| `max` | `number` |          |

### Return

|   Type   |
| :------: |
| `number` |

## Type declarations

```ts
export function clamp(num: number, min: number, max: number) {
  return Math.min(max, Math.max(min, num))
}
```
