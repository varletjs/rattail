# maxBy

Find the maximum value in an array based on the result of applying a function to each element. If the array is empty, `undefined` is returned.

### Usage

```ts
import { maxBy } from 'rattail'

maxBy([{ n: 5 }, { n: 10 }, { n: 8 }], ({ n }) => n)
// return { n: 10 }
```

### Arguments

| Arg   |         Type         | Defaults |
| ----- | :------------------: | -------: |
| `arr` |        `T[]`         |          |
| `fn`  | `(val: T) => number` |          |

### Return

|       Type        |
| :---------------: |
| `T  \| undefined` |
