# pickBy

Creates a new object by picking key-value pairs based on a predicate function.

### Usage

```ts
import { pickBy } from 'rattail'

pickBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
// return { b: 2, c: 3 }
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
