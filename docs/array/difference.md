# difference

Creates an `array` of array values ​​that are not contained in other given arrays.

### Usage

```ts
import { difference } from 'rattail'

difference([1, 2, 3, 4], [2, 3])
// return [1, 4]
difference([1, 2, 3, 4], [2, 3], [3, 4])
// return [1]
```

### Arguments

| Arg         | Type           | Defaults |
| ----------- | -------------- | -------- |
| `arr`       | `Array`        |          |
| `...values` | `Array<Array>` |          |

### Return

| Type    |
| ------- |
| `Array` |
