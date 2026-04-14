---
category: Array
---

# removeItem

Removes the first occurrence of a specific item from an `array` and returns an array of removed items. Returns `undefined` if no item was removed.

## Documentation

- [English](https://rattail.varletjs.org/array/remove-item)
- [Chinese docs](https://rattail.varletjs.org/zh/array/remove-item)

### Usage

```ts
import { removeItem } from 'rattail'

const arr = [1, 2, 3]
const removed = removeItem(arr, 2) // arr becomes [1, 3], removed is [2]

const arr2 = [1, 2, 3]
const removed2 = removeItem(arr2, 4) // arr2 unchanged, removed2 is undefined
```

### Arguments

| Arg    | Type    | Defaults |
| ------ | ------- | -------- |
| `arr`  | `Array` |          |
| `item` | `any`   |          |

### Return

| Type                 |
| -------------------- |
| `Array \| undefined` |

### Notes

- Returns an array containing the removed item(s), or `undefined` if no item was removed.
- The original array is mutated in place.

## Type declarations

```ts
export function removeItem<T>(arr: T[], item: T) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```
