---
category: General
---

# hasDuplicatesBy

Checks if an array contains duplicate values based on a custom comparison function.

## Documentation

- [English](https://rattail.varletjs.org/general/has-duplicates-by)
- [Chinese docs](https://rattail.varletjs.org/zh/general/has-duplicates-by)

### Usage

```ts
import { hasDuplicatesBy } from 'rattail'

hasDuplicatesBy([{ id: 1 }, { id: 2 }, { id: 1 }], (a, b) => a.id === b.id) // true
hasDuplicatesBy([{ id: 1 }, { id: 2 }], (a, b) => a.id === b.id) // false
```

### Arguments

| Arg   | Type            | Defaults |
| ----- | --------------- | -------- |
| `arr` | `Array`         |          |
| `fn`  | `(a, b) => any` |          |

### Return

| Type      |
| --------- |
| `boolean` |

### Notes

- Returns `true` if any two values are considered equal by the comparison function.
- Useful for checking duplicates in arrays of objects or with custom logic.

## Type declarations

```ts
import { uniqBy } from '../array'

export function hasDuplicatesBy<T>(arr: T[], fn: (a: T, b: T) => any): boolean {
  return uniqBy(arr, fn).length !== arr.length
}
```
