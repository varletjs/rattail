# intersection

Creates an `array` of unique values ​​contained in all given arrays.

### Usage

```ts
import { intersection } from 'rattail'

intersection([1, 2, 3, 3], [2, 3, 4])
// return [2, 3]
intersection([1, 2, 3, 3], [2, 3, 4], [3, 4, 5])
// return [3]
```

### Arguments

| Arg         | Type           | Defaults |
| ----------- | -------------- | -------- |
| `...values` | `Array<Array>` |          |

### Return

| Type    |
| ------- |
| `Array` |
