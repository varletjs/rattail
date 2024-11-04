# chunk

Chunking an `array`. The passed `size` indicates the length of the chunk.

### Usage

```ts
import { chunk } from 'rattail'

chunk([1, 2, 3], 2) // return [[1, 2], [3]]
```

### Arguments

| Arg    | Type     | Defaults |
| ------ | -------- | -------- |
| `arr`  | `Array`  |          |
| `size` | `number` | `1`      |

### Return

| Type    |
| ------- |
| `Array` |
