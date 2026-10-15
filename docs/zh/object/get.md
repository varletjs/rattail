# get

获取对象指定路径上的值，取到的值为 `undefined` 时返回 `defaultValue`。

路径可以是键组成的数组，也可以是支持点号和方括号写法的字符串，如 `a.b[0].c`、`a["b.c"]`。字符串路径中的空段会被忽略。字符串路径本身是对象的自有键时，会作为单个键使用。

### 使用

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

### 参数

| 参数           | 类型                                | 默认值 |
| -------------- | ----------------------------------- | ------ |
| `object`       | `any`                               |        |
| `path`         | `string \| Array<string \| number>` |        |
| `defaultValue` | `T`                                 |        |

### 返回值

| 类型 |
| ---- |
| `T`  |
