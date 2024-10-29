# hasOwn

Determine whether an `object` has a specific property as its own (not inherited).

### Usage

```ts
import { hasOwn } from 'rattail'

const obj = { foo: 123 }
hasOwn(obj, 'foo') // return true
hasOwn(obj, 'bar') // return false
```

### Arguments

| Arg     |   Type   | Defaults |
| ------- | :------: | -------: |
| `value` | `object` |          |
| `key`   | `string` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
