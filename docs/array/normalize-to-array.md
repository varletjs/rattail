# normalizeToArray

Converts a value to an `array` if it is not already an array. If the input is an array, it returns the input as-is.

### Usage

```ts
import { normalizeToArray } from 'rattail'

normalizeToArray(5) // return [5]
normalizeToArray([1, 2, 3]) // return [1, 2, 3]
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | ----- | -------- |
| `value` | `any` |          |

### Return

| Type    |
| ------- |
| `Array` |
