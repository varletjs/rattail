# cloneDeep

Create a deep clone of a value.

### Usage

```ts
import { cloneDeep } from 'rattail'

const original = { a: 1, b: { c: 2 } }
const value = cloneDeep(original)
// value is { a: 1, b: { c: 2 } }
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

| Type  |
| :---: |
| `any` |
