# times

执行指定次数的函数调用，并返回结果数组。每次调用会传入当前索引。

### 使用

```ts
import { times } from 'rattail'

times(3, (index) => index * 2)
// return [0, 2, 4]
times(5, (index) => `Item ${index}`)
// return ['Item 0', 'Item 1', 'Item 2', 'Item 3', 'Item 4']
```

### 参数

| 参数  |           类型           | 默认值 |
| ----- | :----------------------: | -----: |
| `num` |         `number`         |        |
| `fn`  | `(index: number) => any` |        |

### 返回值

|  类型   |
| :-----: |
| `Array` |
