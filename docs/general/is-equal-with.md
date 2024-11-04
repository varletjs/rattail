# isEqualWith

Deeply compare two values. Supports passing a comparison method, and returns `true` if the two values ​​are equal.

### Usage

```ts
import { isEqualWith, isObject } from 'rattail'

isEqualWith([1, 2], ['1', '2'], (v1, v2) => {
  if (!isObject(v1) && !isObject(v2)) {
    return String(v1) === String(v2)
  }
})
// return true
```

### Arguments

| Arg     |          Type           | Defaults |
| ------- | :---------------------: | -------: |
| `value` |          `any`          |          |
| `other` |          `any`          |          |
| `fn`    | `(value, other) => any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
