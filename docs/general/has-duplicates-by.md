# hasDuplicatesBy

Checks if an array contains duplicate values based on a custom comparison function.

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
