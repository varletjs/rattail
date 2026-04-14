---
category: Number
---

# randomNumber

Generate a random integer between `min` and `max`, inclusive. If no values are provided, it defaults to a range of `0` to `100`.

## Documentation

- [English](https://rattail.varletjs.org/number/random-number)
- [Chinese docs](https://rattail.varletjs.org/zh/number/random-number)

### Usage

```ts
import { randomNumber } from 'rattail'

randomNumber(1, 10) // return a random integer between 1 and 10
randomNumber() // return 0 or 100 (default range)
```

### Arguments

| Arg   |   Type   | Defaults |
| ----- | :------: | -------: |
| `min` | `number` |      `0` |
| `max` | `number` |    `100` |

### Return

|   Type   |
| :------: |
| `number` |

## Type declarations

```ts
export function randomNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```
