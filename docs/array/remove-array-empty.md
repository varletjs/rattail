# removeArrayEmpty

Removes `null`, `undefined`, or empty string (`''`) values from an `array`.

### Usage

```ts
import { removeArrayEmpty } from 'rattail'

removeArrayEmpty([1, null, undefined, '', 3]) // return [1, 3]
```

### Arguments

| Arg   | Type    | Defaults |
| ----- | ------- | -------- |
| `arr` | `Array` |          |

### Return

| Type    |
| ------- |
| `Array` |
