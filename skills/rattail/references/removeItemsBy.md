---
category: Array
---

# removeItemsBy

Removes all items from an array that match a predicate function, mutating the original array, and returns the removed items as a new array.

## Documentation

- [English](https://rattail.varletjs.org/array/remove-items-by)
- [Chinese docs](https://rattail.varletjs.org/zh/array/remove-items-by)

### Usage

```ts
import { removeItemsBy } from 'rattail'

const arr = [1, 2, 3, 4]
const removed = removeItemsBy(arr, (v) => v % 2 === 0)
// arr becomes [1, 3]
// removed is [2, 4]

const users = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
]
const removedUsers = removeItemsBy(users, (u) => u.id === 2)
// users becomes [{ id: 1, name: 'A' }, { id: 3, name: 'C' }]
// removedUsers is [{ id: 2, name: 'B' }]
```

### Arguments

| Arg   | Type            | Defaults |
| ----- | --------------- | -------- |
| `arr` | `Array`         |          |
| `fn`  | `(item) => any` |          |

### Return

| Type    |
| ------- |
| `Array` |

### Notes

- The original array is mutated in place.
- All items matching the predicate will be removed and returned as a new array.

## Type declarations

```ts
export function removeItemsBy<T>(arr: T[], fn: (v: T) => any) {
  let i = 0

  const removedItems: T[] = []

  while (i < arr.length) {
    if (fn(arr[i])) {
      removedItems.push(...arr.splice(i, 1))
    } else {
      i++
    }
  }

  return removedItems
}
```
