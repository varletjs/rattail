# difference

创建一个不包含在其他给定数组中的数组值的 `数组`。

### 使用

```ts
import { difference } from 'rattail'

difference([1, 2, 3, 4], [2, 3])
// return [1, 4]
difference([1, 2, 3, 4], [2, 3], [3, 4])
// return [1]
```

### 参数

| 参数        | 类型           | 默认值 |
| ----------- | -------------- | ------ |
| `arr`       | `Array`        |        |
| `...values` | `Array<Array>` |        |

### 返回值

| 类型    |
| ------- |
| `Array` |
