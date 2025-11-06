# removeItemsBy

移除数组中所有满足条件函数的元素，原数组会被直接修改，并返回被移除元素组成的新数组。

### 使用

```ts
import { removeItemsBy } from 'rattail'

const arr = [1, 2, 3, 4]
const removed = removeItemsBy(arr, (v) => v % 2 === 0)
// arr 变为 [1, 3]
// removed 为 [2, 4]

const users = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
]
const removedUsers = removeItemsBy(users, (u) => u.id === 2)
// users 变为 [{ id: 1, name: 'A' }, { id: 3, name: 'C' }]
// removedUsers 为 [{ id: 2, name: 'B' }]
```

### 参数

| 参数  | 类型                | 默认值 |
| ----- | ------------------- | ------ |
| `arr` | `Array`             |        |
| `fn`  | `(item) => boolean` |        |

### 返回值

| 类型    |
| ------- |
| `Array` |

### 注意事项

- 返回被移除元素组成的新数组。
- 原数组会被原地修改。
- 所有满足条件的元素都会被移除，并作为新数组返回。
