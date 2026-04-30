# rekey

Rename object keys by a mapping and construct a new object.

### Usage

```ts
import { rekey } from 'rattail'

rekey({ a: 1, b: 2, c: 3 }, { a: 'x', c: 'z' })
// return { x: 1, b: 2, z: 3 }
```

### Arguments

| Arg       | Type     | Defaults |
| --------- | -------- | -------- |
| `object`  | `object` |          |
| `mapping` | `object` |          |

### Return

| Type     |
| -------- |
| `object` |
