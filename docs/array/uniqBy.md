# uniqBy

Creates a duplicate-free version of an array, using a custom comparison function to determine uniqueness.

### Usage

```ts
import { uniqBy } from 'rattail'

uniqBy([{ id: 1 }, { id: 2 }, { id: 1 }], (a, b) => a.id === b.id) // returns [{ id: 1 }, { id: 2 }]
```

### Arguments

| Arg   | Type                          | Defaults |
| ----- | ----------------------------- | -------- |
| `arr` | `Array`                       |          |
| `fn`  | `(a: any, b: any) => boolean` |          |

### Return

| Type    |
| ------- |
| `Array` |
