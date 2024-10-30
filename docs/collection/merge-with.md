# mergeWith

Merge two objects recursively, allowing for custom merge logic through a callback function.

### Usage

```ts
import { mergeWith } from 'rattail'

const object = { a: 1, b: { c: 2 } }
const source = { b: { d: 3 }, e: 4 }
const result = mergeWith(object, source)
// result: { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

```ts
const object = { a: [1, 2] }
const source = { a: [3, 4] }
const result = mergeWith(object, source, (objValue, srcValue) => [...objValue, ...srcValue])
// result: { a: [ 1, 2, 3, 4 ] }
```

### Arguments

| Arg        | Type                                                                                      | Defaults |
| ---------- | ----------------------------------------------------------------------------------------- | -------- |
| `object`   | `object`                                                                                  |          |
| `source`   | `object`                                                                                  |          |
| `callback` | `(objValue: any, srcValue: any, key: any, object: object, source: object) => any \| void` |          |

### Return

| Type     |
| -------- |
| `object` |
