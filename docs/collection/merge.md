# merge

Merge two objects recursively.

### Usage

```ts
import { merge } from 'rattail'

merge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })
// return { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

### Arguments

| Arg          | Type       | Defaults |
| ------------ | ---------- | -------- |
| `object`     | `object`   |          |
| `...sources` | `object[]` |          |

### Return

| Type     |
| -------- |
| `object` |
