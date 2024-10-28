# isEmpty

Determine whether the input value is empty (undefined, null, an empty string, or an empty array)

### Usage

```ts
import { isEmpty } from 'rattail'

isEmpty(null) // return true
isEmpty('') // return true
isEmpty([]) // return true
isEmpty([1, 2, 3]) // return false
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
