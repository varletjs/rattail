# cloneDeepWith

Create a deep clone of a value, applying a custom function for cloning on each value. The function will process objects with various types.

### Usage

```ts
import { isNumber, cloneDeepWith } from 'rattail'

const original = { a: 1, b: { c: 2 } }
const value = cloneDeepWith(original, (val) => {
  if (isNumber(val)) {
    return val * 2
  }
})
// value is { a: 2, b: { c: 4 } }
```

### Arguments

| Arg     |         Type          | Defaults |
| ------- | :-------------------: | -------: |
| `value` |         `any`         |          |
| `fn`    | `(value: any) => any` |          |

### Return

| Type  |
| :---: |
| `any` |
