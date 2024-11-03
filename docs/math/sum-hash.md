# sumHash

Calculate a hash sum for a given value. The hash is generated based on the value's properties and content, and it returns a hexadecimal string representation of the hash.

### Usage

```ts
import { sumHash } from 'rattail'

sumHash('123')
// return '1a3a267c'
sumHash({ a: '123' })
// return 'b1c920ac'
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type   |
| :------: |
| `string` |
