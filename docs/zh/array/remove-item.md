# removeItem

从 `数组` 中移除 `第一次` 出现的指定元素，返回被移除元素组成的新数组。如果没有移除任何元素，则返回 `undefined`。

### 使用

```ts
import { removeItem } from 'rattail'

const removed = removeItem(arr, 2) // arr 变为 [1, 3]，removed 为 [2]
const arr = [1, 2, 3]
removeItem(arr, 2) // arr 变为 [1, 3]
const removed2 = removeItem(arr2, 4) // arr2 不变，removed2 为 undefined
```

### 参数

| 参数   | 类型    | 默认值 |
| ------ | ------- | ------ |
| `arr`  | `Array` |        |
| `item` | `any`   |        |

### 返回值

| 类型                 |
| -------------------- |
| `Array \| undefined` |

### 注意事项

- 返回被移除元素组成的新数组，如果没有移除任何元素，则返回 `undefined`。
- 原数组会被原地修改。
