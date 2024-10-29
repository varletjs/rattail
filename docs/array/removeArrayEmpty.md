# removeArrayEmpty

Removes `null`, `undefined`, or empty string (`''`) values from an array.

### Usage

```ts
import { removeArrayEmpty } from 'rattail'

removeArrayEmpty([1, null, '', 3]) // returns [1, 3]
```

### Arguments

| Arg   | Type    | Defaults |
| ----- | ------- | -------- |
| `arr` | `Array` |          |

### Return

| Type    |
| ------- |
| `Array` |
