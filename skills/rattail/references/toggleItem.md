---
category: Array
---

# toggleItem

Adds or removes an item from an `array`, based on its existence in the array.

## Documentation

- [English](https://rattail.varletjs.org/array/toggle-item)
- [Chinese docs](https://rattail.varletjs.org/zh/array/toggle-item)

### Usage

```ts
import { toggleItem } from 'rattail'

const arr = [1, 2]
toggleItem(arr, 2) // arr becomes [1]
toggleItem(arr, 3) // arr becomes [1, 3]
```

### Arguments

| Arg    | Type    | Defaults |
| ------ | ------- | -------- |
| `arr`  | `Array` |          |
| `item` | `any`   |          |

### Return

| Type    |
| ------- |
| `Array` |

## Type declarations

```ts
import { removeItem } from './removeItem'

export function toggleItem<T>(arr: T[], item: T) {
  arr.includes(item) ? removeItem(arr, item) : arr.push(item)
  return arr
}
```
