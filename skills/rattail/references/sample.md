---
category: Math
---

# sample

Return a random element from an `array`. If the array is empty, `undefined` is returned.

## Documentation

- [English](https://rattail.varletjs.org/math/sample)
- [Chinese docs](https://rattail.varletjs.org/zh/math/sample)

### Usage

```ts
import { sample } from 'rattail'

sample([1, 2, 3, 4, 5]) // returns a random element, e.g., 3
sample([]) // returns undefined
```

### Arguments

| Arg   | Type  | Defaults |
| ----- | :---: | -------: |
| `arr` | `T[]` |          |

### Return

|       Type        |
| :---------------: |
| `T  \| undefined` |

## Type declarations

```ts
import { randomNumber } from '../number'

export function sample<T>(arr: T[]) {
  if (!arr.length) {
    return
  }

  return arr[randomNumber(0, arr.length - 1)]
}
```
