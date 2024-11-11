# mergeWith

Merge two objects recursively, allowing for custom merge logic through a callback function.

### Usage

```ts
import { mergeWith } from 'rattail'

mergeWith({ a: [1, 2] }, { a: [3, 4] }, (objValue, srcValue) => [...objValue, ...srcValue])
// return: { a: [ 1, 2, 3, 4 ] }
```

### Arguments

| Arg          | Type                                                                              | Defaults |
| ------------ | --------------------------------------------------------------------------------- | -------- |
| `object`     | `object`                                                                          |          |
| `...sources` | `object[]`                                                                        |          |
| `fn`         | `(objValue: any, srcValue: any, key: any, object: object, source: object) => any` |          |

### Return

| Type     |
| -------- |
| `object` |
