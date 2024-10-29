# uniq

Creates a duplicate-free version of an array, using the values' equality.

### Usage

```ts
import { uniq } from 'rattail'

uniq([1, 2, 2, 3]) // returns [1, 2, 3]
uniq(['a', 'a', 'b', 'c']) // returns ['a', 'b', 'c']
```

### Arguments

| Arg   | Type    | Defaults |
| ----- | ------- | -------- |
| `arr` | `Array` |          |

### Return

| Type    |
| ------- |
| `Array` |
