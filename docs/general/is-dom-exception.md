# isDOMException

Determine whether the input value is a `DOMException` object.

### Usage

```ts
import { isDOMException } from 'rattail'

isDOMException(new DOMException('An error occurred')) // return true
isDOMException(new Error('An error occurred')) // return false
```

### Arguments

| Arg   | Type  | Defaults |
| ----- | :---: | -------: |
| `val` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
