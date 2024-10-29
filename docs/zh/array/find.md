# find

在`数组`中查找`第一个`或`最后一个`满足指定条件的元素，返回该元素及其索引。

### 使用

```ts
import { find } from 'rattail'

find(['a', 'b', 'c'], (item) => item === 'a')
// return ['a', 0]
find(['a', 'b', 'a'], (item) => item === 'a', 'end')
// return ['a', 2]
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
