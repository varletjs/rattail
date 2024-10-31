# meanBy

Calculate the mean (average) of an `array` by applying a function to each element to derive a numeric value.

### Usage

```ts
import { meanBy } from 'rattail'

meanBy([{ n: 4 }, { n: 6 }, { n: 8 }], ({ n }) => n)
// return 6
meanBy([10, 20, 30], (n) => n / 2)
// return 10
```

### Arguments

| Arg   |         Type         | Defaults |
| ----- | :------------------: | -------: |
| `arr` |        `T[]`         |          |
| `fn`  | `(val: T) => number` |          |

### Return

|   Type   |
| :------: |
| `number` |
