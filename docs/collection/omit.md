# omit

Creates a new object by omitting specified keys from an existing object.

### Usage

```ts
import { omit } from 'rattail'

const omitted = omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])
console.log(omitted) // { b: 2 }
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
