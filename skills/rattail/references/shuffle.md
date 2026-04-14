---
category: Array
---

# shuffle

Randomly shuffles elements within an `array`.

## Documentation

- [English](https://rattail.varletjs.org/array/shuffle)
- [Chinese docs](https://rattail.varletjs.org/zh/array/shuffle)

### Usage

```ts
import { shuffle } from 'rattail'

shuffle([1, 2, 3]) // return shuffled array
```

### Arguments

| Arg   | Type    | Defaults |
| ----- | ------- | -------- |
| `arr` | `Array` |          |

### Return

| Type    |
| ------- |
| `Array` |

## Type declarations

```ts
export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
```
