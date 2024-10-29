# uniqBy

使用自定义比较函数返回去重后的`数组`。

### 使用

```ts
import { uniqBy } from 'rattail'

uniqBy([{ id: 1 }, { id: 2 }, { id: 1 }], (a, b) => a.id === b.id)
// return [{ id: 1 }, { id: 2 }]
```

### 参数

| 参数  | 类型                          | 默认值 |
| ----- | ----------------------------- | ------ |
| `arr` | `Array`                       |        |
| `fn`  | `(a: any, b: any) => boolean` |        |

### 返回值

| 类型    |
| ------- |
| `Array` |
