---
category: Array
---

# at

Retrieves the element at a specified index in an `array`, supporting negative indices.

## Documentation

- [English](https://rattail.varletjs.org/array/at)
- [Chinese docs](https://rattail.varletjs.org/zh/array/at)

### Usage

```ts
import { at } from 'rattail'

at([1, 2, 3], 0) // return 1
at([1, 2, 3], -1) // return 3
```

### Arguments

| Arg     | Type     | Defaults |
| ------- | -------- | -------- |
| `arr`   | `Array`  |          |
| `index` | `number` |          |

### Return

| Type  |
| ----- |
| `any` |

## Type declarations

```ts
export function at<T>(arr: T[], index: number): T | undefined {
  if (!arr.length) {
    return
  }

  if (index < 0) {
    index += arr.length
  }

  return arr[index]
}
```
