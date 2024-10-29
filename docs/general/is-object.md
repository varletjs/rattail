# isObject

Determine whether the input value is an `object` (excluding `null`).

### Usage

```ts
import { isObject } from 'rattail'

isObject({}) // return true
isObject([]) // return true
isObject(null) // return false
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
