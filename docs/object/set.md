# set

Set a value at a given path in an object, creating nested objects or arrays as needed.

### Usage

```ts
import { set } from 'rattail'

const obj = {}
set(obj, ['a', 'b', 'c'], 123)
// obj = { a: { b: { c: 123 } } }

set(obj, ['x', 0, 'y'], 'hello')
// obj = { a: { b: { c: 123 } }, x: [ { y: 'hello' } ] }
```

### Arguments

| Arg      | Type                      | Defaults |
| -------- | ------------------------- | -------- |
| `object` | `object`                  | `any[]`  |
| `path`   | `Array<string \| number>` |
| `value`  | `any`                     |          |

### Return

| Type   |
| ------ |
| `void` |
