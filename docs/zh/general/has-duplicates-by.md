# hasDuplicatesBy

根据自定义比较函数判断数组中是否存在重复值。

### 使用

```ts
import { hasDuplicatesBy } from 'rattail'

hasDuplicatesBy([{ id: 1 }, { id: 2 }, { id: 1 }], (a, b) => a.id === b.id) // true
hasDuplicatesBy([{ id: 1 }, { id: 2 }], (a, b) => a.id === b.id) // false
```

### 参数

| 参数  | 类型            | 默认值 |
| ----- | --------------- | ------ |
| `arr` | `Array`         |        |
| `fn`  | `(a, b) => any` |        |

### 返回值

| 类型      |
| --------- |
| `boolean` |

### 注意事项

- 如果有任意两个值通过比较函数被认为相等，则返回 `true`。
- 适用于对象数组或自定义判等逻辑的去重场景。
