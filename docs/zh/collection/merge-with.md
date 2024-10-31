# mergeWith

递归合并两个对象，可通过回调函数自定义合并逻辑。

### 用法

```ts
import { mergeWith } from 'rattail'

mergeWith({ a: [1, 2] }, { a: [3, 4] }, (objValue, srcValue) => [...objValue, ...srcValue])
// return { a: [ 1, 2, 3, 4 ] }
```

### 参数

| 参数       | 类型                                                                              | 默认值 |
| ---------- | --------------------------------------------------------------------------------- | ------ |
| `object`   | `object`                                                                          |        |
| `source`   | `object`                                                                          |        |
| `callback` | `(objValue: any, srcValue: any, key: any, object: object, source: object) => any` |        |

### 返回值

| 类型     |
| -------- |
| `object` |
