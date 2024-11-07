# omit

Excludes object properties and constructs a new object.

### Usage

```ts
import { omit } from 'rattail'

omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])
// return { b: 2 }
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
