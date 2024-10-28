# isPromise

Determine whether the input value is a Promise

### Usage

```ts
import { isPromise } from 'rattail'

isPromise(Promise.resolve()) // return true
isPromise({}) // return false
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
