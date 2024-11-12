# differenceWith

Creates an array of array values ​​that are not contained in other given arrays, and supports custom comparison functions.

### Usage

```ts
import { difference } from 'rattail'

differenceWith([{ num: 1 }, { num: 2 }, { num: 3 }], [{ num: 2 }], (a, b) => a.num === b.num)
// return [{ num: 1 }, { num: 3 }]
differenceWith([{ num: 1 }, { num: 2 }, { num: 3 }], [{ num: 2 }], [{ num: 3 }], (a, b) => a.num === b.num)
// return [{ num: 1 }]
```

### Arguments

| Arg         | Type                      | Defaults |
| ----------- | ------------------------- | -------- |
| `arr`       | `Array`                   |          |
| `...values` | `Array<Array>`            |          |
| `fn`        | `(a: any, b: any) => any` |          |

### Return

| Type    |
| ------- |
| `Array` |
