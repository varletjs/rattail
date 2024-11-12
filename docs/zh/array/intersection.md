# intersection

创建一个去重数组，数组中的每个值都被包含在所有的给定数组中（数组取交集）。

### 使用

```ts
import { intersection } from 'rattail'

intersection([1, 2, 3, 3], [2, 3, 4])
// return [2, 3]
intersection([1, 2, 3, 3], [2, 3, 4], [3, 4, 5])
// return [3]
```

### 参数

| 参数        | 类型           | 默认值 |
| ----------- | -------------- | ------ |
| `...values` | `Array<Array>` |        |

### 返回值

| 类型    |
| ------- |
| `Array` |
