# hasDuplicates

Checks if an array contains duplicate values.

### Usage

```ts
import { hasDuplicates } from 'rattail'

hasDuplicates([1, 2, 3, 2]) // true
hasDuplicates([1, 2, 3]) // false
```

### Arguments

| Arg   | Type    | Defaults |
| ----- | ------- | -------- |
| `arr` | `Array` |          |

### Return

| Type      |
| --------- |
| `boolean` |

### Notes

- Returns `true` if any value appears more than once in the array.
- Uses strict equality for comparison.
