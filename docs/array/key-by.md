# keyBy

Creates an `object` keyed by the return value of `keyFn`. When `valueFn` is passed, its return value is used as the value instead of the item itself. Each key keeps only one value, and later items override earlier ones with the same key. Use `groupBy` if all items under a key are needed.

### Usage

```ts
import { keyBy } from 'rattail'

const users = [
  { uuid: 'a', name: 'Alice' },
  { uuid: 'b', name: 'Bob' },
]

keyBy(users, (user) => user.uuid)
// return { a: { uuid: 'a', name: 'Alice' }, b: { uuid: 'b', name: 'Bob' } }
keyBy(
  users,
  (user) => user.uuid,
  (user) => user.name,
)
// return { a: 'Alice', b: 'Bob' }
```

### Arguments

| Arg       | Type                                        | Defaults    |
| --------- | ------------------------------------------- | ----------- |
| `arr`     | `Array`                                     |             |
| `keyFn`   | `(item: any, index: number) => PropertyKey` |             |
| `valueFn` | `(item: any, index: number) => any`         | item itself |

### Return

| Type     |
| -------- |
| `object` |
