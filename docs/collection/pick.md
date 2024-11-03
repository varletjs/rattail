# pick

Creates a new object by selecting specified keys from an existing object.

### Usage

```ts
import { pick } from 'rattail'

const picked = pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
console.log(picked) // { a: 1, c: 3 }
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
