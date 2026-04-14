---
category: Number
---

# clampArrayRange

Clamp an index within the bounds of an array's length. Ensures the index is at least `0` and at most `arr.length - 1`.

## Documentation

- [English](https://rattail.varletjs.org/number/clamp-array-range)
- [Chinese docs](https://rattail.varletjs.org/zh/number/clamp-array-range)

### Usage

```ts
import { clampArrayRange } from 'rattail'

const arr = ['a', 'b', 'c']
clampArrayRange(1, arr) // return 1
clampArrayRange(-1, arr) // return 0
clampArrayRange(5, arr) // return 2
```

### Arguments

| Arg     |   Type   | Defaults |
| ------- | :------: | -------: |
| `index` | `number` |          |
| `arr`   | `Array`  |          |

### Return

|   Type   |
| :------: |
| `number` |

## Type declarations

```ts
import { clamp } from './clamp'

export function clampArrayRange(index: number, arr: unknown[]) {
  return clamp(index, 0, arr.length - 1)
}
```
