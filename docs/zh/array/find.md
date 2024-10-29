# find

在数组中查找第一个或最后一个满足指定条件的元素，返回该元素及其索引。

### 使用

```ts
import { find } from 'rattail'

find([1, 2, 3], (item) => item > 1) // return [2, 1]
```

### 参数

| 参数   | 类型                                              | 默认值    |
| ------ | ------------------------------------------------- | --------- |
| `arr`  | `Array`                                           |           |
| `fn`   | `(item: any, index: number, array: Array) => any` |           |
| `from` | `'start' \| 'end'`                                | `'start'` |

### 返回值

| 类型                          |
| ----------------------------- |
| `[any, number] \| [null, -1]` |
