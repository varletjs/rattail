# sample

Return a random element from an `array`. If the array is empty, `undefined` is returned.

### Usage

```ts
import { sample } from 'rattail'

sample([1, 2, 3, 4, 5]) // returns a random element, e.g., 3
sample([]) // returns undefined
```

### Arguments

| Arg   | Type  | Defaults |
| ----- | :---: | -------: |
| `arr` | `T[]` |          |

### Return

|       Type        |
| :---------------: |
| `T  \| undefined` |
