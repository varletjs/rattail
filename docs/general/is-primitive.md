# isPrimitive

Determine whether the input value is a `primitive`.

### Usage

```ts
import { isPrimitive } from 'rattail'

isPrimitive(1) // return true
isPrimitive('1') // return true
isPrimitive(null) // return true
isPrimitive(undefined) // return true
isPrimitive(true) // return true
isPrimitive(Symbol('1')) // return true
isPrimitive(1n) // return true
isPrimitive({}) // return false
isPrimitive([]) // return false
isPrimitive(new Date()) // return false
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
