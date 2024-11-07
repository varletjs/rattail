# omitBy

Creates a new object by omitting key-value pairs based on a predicate function.

### Usage

```ts
import { omitBy } from 'rattail'

omitBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
// return { a: 1 }
```

### Arguments

| Arg      | Type                                   | Defaults |
| -------- | -------------------------------------- | -------- |
| `object` | `object`                               |          |
| `fn`     | `(value: any, key: string) => boolean` |          |

### Return

| Type     |
| -------- |
| `object` |
