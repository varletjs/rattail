# isEmptyPlainObject

Determine whether the input value is a empty(No own enumerable keys and no symbols) plain object.

### Usage

```ts
import { isEmptyPlainObject } from 'rattail'

isEmptyPlainObject({}) // return true
isEmptyPlainObject(Object.create(null)) // return true
isEmptyPlainObject([]) // return false
isEmptyPlainObject({ a: 1 }) // return false
isEmptyPlainObject({ [Symbol()]: 1 }) // return false
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
