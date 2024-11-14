# xor

对传入的数组进行异或(Exclusive OR)计算，返回一个新的 `数组`。

### 使用

```ts
import { xor } from 'rattail'

xor([1, 2, 2], [1, 3])
// return [2, 3]
xor([1, 2], [1, 2], [3])
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
