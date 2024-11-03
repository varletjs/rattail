# pickBy

Creates a new object by picking key-value pairs based on a predicate function.

### Usage

```ts
import { pickBy } from 'rattail'

const picked = pickBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
console.log(picked) // { b: 2, c: 3 }
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
