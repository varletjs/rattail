# chunk

对 `数组` 进行分块。传递的 `size` 表示块的长度。

### 使用

```ts
import { chunk } from 'rattail'

chunk([1, 2, 3], 2) // return [[1, 2], [3]]
```

### 参数

| 参数   | 类型     | 默认值 |
| ------ | -------- | ------ |
| `arr`  | `Array`  |        |
| `size` | `number` | `1`    |

### 返回值

| 类型    |
| ------- |
| `Array` |
