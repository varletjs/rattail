# get

Get the value at a given path of an object. Returns `defaultValue` when the resolved value is `undefined`.

The path can be an array of keys, or a string with dot and bracket notation such as `a.b[0].c` or `a["b.c"]`. Empty segments in a string path are ignored. A string path that is an own key of the object is used as a single key.

### Usage

```ts
import { get } from 'rattail'

const obj = { a: { b: [{ c: 1 }] }, 'x.y': 2 }

get(obj, 'a.b[0].c')
// 1
get(obj, ['a', 'b', 0, 'c'])
// 1
get(obj, 'x.y')
// 2
get(obj, 'a.d', 'default')
// 'default'
```

### Arguments

| Arg            | Type                                | Defaults |
| -------------- | ----------------------------------- | -------- |
| `object`       | `any`                               |          |
| `path`         | `string \| Array<string \| number>` |          |
| `defaultValue` | `T`                                 |          |

### Return

| Type |
| ---- |
| `T`  |
