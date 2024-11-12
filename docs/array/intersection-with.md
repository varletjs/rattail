# intersectionWith

Creates an `array` of unique values ​​contained in all given arrays, and supports custom comparison functions.

### Usage

```ts
import { intersectionWith } from 'rattail'

intersectionWith(
  [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 3 }],
  [{ num: 2 }, { num: 3 }, { num: 4 }],
  (a, b) => a.num === b.num,
)
// return [{ num: 2 }, { num: 3 }]
intersectionWith(
  [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 3 }],
  [{ num: 2 }, { num: 3 }, { num: 4 }],
  [{ num: 3 }, { num: 4 }, { num: 5 }],
  (a, b) => a.num === b.num,
)
// return [{ num: 3 }]
```

### Arguments

| Arg         | Type                      | Defaults |
| ----------- | ------------------------- | -------- |
| `...values` | `Array<Array>`            |          |
| `fn`        | `(a: any, b: any) => any` |          |

### Return

| Type    |
| ------- |
| `Array` |
