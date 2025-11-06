# removeItemBy

Removes the first occurrence of a specific item from an array that match a predicate function, mutating the original array, and returns the removed items as a new array. Returns `undefined` if no item was removed.

### Usage

```ts
import { removeItemBy } from 'rattail'

const arr = [1, 2, 3, 4]
const removed = removeItemBy(arr, (v) => v % 2 === 0)
// arr becomes [1, 3, 4]
// removed is [2]

const users = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
]
const removedUsers = removeItemBy(users, (u) => u.id === 2)
// users becomes [{ id: 1, name: 'A' }, { id: 3, name: 'C' }]
// removedUsers is [{ id: 2, name: 'B' }]
```

### Arguments

| Arg   | Type            | Defaults |
| ----- | --------------- | -------- |
| `arr` | `Array`         |          |
| `fn`  | `(item) => any` |          |

### Return

| Type                 |
| -------------------- |
| `Array \| undefined` |

### Notes

- The original array is mutated in place.
- All items matching the predicate will be removed and returned as a new array.
