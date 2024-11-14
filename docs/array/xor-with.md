# xorWith

XOR(Exclusive OR) the passed array and return a new `array`, and supports custom comparison functions.

### Usage

```ts
import { xorWith } from 'rattail'

xorWith([{ num: 1 }, { num: 2 }, { num: 2 }], [{ num: 1 }, { num: 3 }], (a, b) => a.num === b.num)
// return [{ num: 2 }, { num: 3 }]
xorWith([{ num: 1 }, { num: 2 }], [{ num: 1 }, { num: 2 }], [{ num: 3 }], (a, b) => a.num === b.num)
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
