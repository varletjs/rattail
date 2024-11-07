# omitBy

Excludes an object property by providing a function that constructs a new object. Returns a `truthy` value to indicate that the property should be excluded.

### Usage

```ts
import { omitBy } from 'rattail'

omitBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
// return { a: 1 }
omitBy({ a: 1, b: 2, c: 3 }, (value, key) => key !== 'a')
// return { a: 1 }
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
