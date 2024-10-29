# removeArrayEmpty

移除数组中值为 `null`、`undefined` 或空字符串（`''`）的元素。

### 使用

```ts
import { removeArrayEmpty } from 'rattail'

removeArrayEmpty([1, null, undefined, '', 3]) // return [1, 3]
```

### 参数

| 参数  | 类型    | 默认值 |
| ----- | ------- | ------ |
| `arr` | `Array` |        |

### 返回值

| 类型    |
| ------- |
| `Array` |
