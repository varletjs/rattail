# mapObject

Maps an object into a new object.

### Usage

```ts
import { mapObject } from 'rattail'

mapObject({ a: 1, b: 2 }, (key, value) => [key, value * 2])
// return { a: 2, b: 4 }
mapObject({ a: 1, b: 2 }, (key, value) => [`${key}${value}`, value])
// return { a1: 1, b2: 2 }
mapObject({ a: 1, b: 2 }, (key, value) => (value === 1 ? [key, value] : undefined))
// return { a: 1 }
```

### Arguments

| Arg      | Type                                                                  | Defaults |
| -------- | --------------------------------------------------------------------- | -------- |
| `object` | `object`                                                              |          |
| `fn`     | `(key: string, value: any) => [key: string, value: any] \| undefined` |          |

### Return

| Type     |
| -------- |
| `object` |
