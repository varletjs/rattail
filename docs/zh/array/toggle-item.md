# toggleItem

根据元素是否在`数组`中，将其添加到数组`末尾`或从数组中移除。

### 使用

```ts
import { toggleItem } from 'rattail'

const arr = [1, 2]
toggleItem(arr, 2) // arr 变为 [1]
toggleItem(arr, 3) // arr 变为 [1, 3]
```

### 参数

| 参数   | 类型    | 默认值 |
| ------ | ------- | ------ |
| `arr`  | `Array` |        |
| `item` | `any`   |        |

### 返回值

| 类型    |
| ------- |
| `Array` |
