# pick

Creates a new object by selecting specified keys from an existing object.

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
