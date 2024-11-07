# pickBy

By providing a function to extract object properties and construct a new object, returning a `truthy` value indicates that the property needs to be extracted.

### Usage

```ts
import { pickBy } from 'rattail'

pickBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
// return { b: 2, c: 3 }
pickBy({ a: 1, b: 2, c: 3 }, (value, key) => key !== 'a')
// return { b: 2, c: 3 }
```

### Arguments

| Arg      | Type                               | Defaults |
| -------- | ---------------------------------- | -------- |
| `object` | `object`                           |          |
| `fn`     | `(value: any, key: string) => any` |          |

### Return

| Type     |
| -------- |
| `object` |
