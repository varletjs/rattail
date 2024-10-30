# mergeWith

递归合并两个对象，可通过回调函数自定义合并逻辑。

### 用法

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

### 参数

| 参数       | 类型                                                                                      | 默认值 |
| ---------- | ----------------------------------------------------------------------------------------- | ------ |
| `object`   | `object`                                                                                  |        |
| `source`   | `object`                                                                                  |        |
| `callback` | `(objValue: any, srcValue: any, key: any, object: object, source: object) => any \| void` |        |

### 返回值

| 类型     |
| -------- |
| `object` |
