# isNonEmptyArray

Determine whether the input value is a `non-empty array`.

### Usage

```ts
import { isNonEmptyArray } from 'rattail'

isNonEmptyArray([1, 2, 3]) // return true
isNonEmptyArray([]) // return false
isNonEmptyArray(1) // return false
isNonEmptyArray(null) // return false
isNonEmptyArray(undefined) // return false
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
