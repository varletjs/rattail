# pick

Pick object properties and construct a new object.

### Usage

```ts
import { pick } from 'rattail'

pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
// return { a: 1, c: 3 }
```

### Arguments

| Arg      | Type       | Defaults |
| -------- | ---------- | -------- |
| `object` | `object`   |          |
| `keys`   | `string[]` |          |

### Return

| Type     |
| -------- |
| `object` |
