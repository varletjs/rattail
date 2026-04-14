---
category: Array
---

# chunk

Chunking an `array`. The passed `size` indicates the length of the chunk.

## Documentation

- [English](https://rattail.varletjs.org/array/chunk)
- [Chinese docs](https://rattail.varletjs.org/zh/array/chunk)

### Usage

```ts
import { chunk } from 'rattail'

chunk([1, 2, 3], 2) // return [[1, 2], [3]]
```

### Arguments

| Arg    | Type     | Defaults |
| ------ | -------- | -------- |
| `arr`  | `Array`  |          |
| `size` | `number` | `1`      |

### Return

| Type    |
| ------- |
| `Array` |

## Type declarations

```ts
import { clamp } from '../number'

export function chunk<T>(arr: T[], size = 1): T[][] {
  size = clamp(size, 1, arr.length)

  const result: T[][] = []
  let index = 0

  while (index < arr.length) {
    result.push(arr.slice(index, index + size))
    index += size
  }

  return result
}
```
