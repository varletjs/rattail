# omitBy

Creates a new object by omitting key-value pairs based on a predicate function.

### Usage

```ts
import { omitBy } from 'rattail'

const picked = omitBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
console.log(picked) // { a: 1 }
```

### Arguments

| Arg         | Type                                   | Defaults |
| ----------- | -------------------------------------- | -------- |
| `object`    | `object`                               |          |
| `predicate` | `(value: any, key: string) => boolean` |          |

### Return

| Type     |
| -------- |
| `object` |
