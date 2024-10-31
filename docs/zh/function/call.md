# call

调用单个函数或多个函数（通过数组传入），并传递参数给它们。

### 使用

```ts
import { call } from 'rattail'

call((a, b) => a + b, 1, 2)
// return 3
call([(a, b) => a + b, (a, b) => a + b], 1, 2)
// return [3, 3]
```

### 参数列表

| 参数      |           类型           | 默认值 |
| --------- | :----------------------: | -----: |
| `fn`      | `Function \| Function[]` |        |
| `...args` |         `any[]`          |        |

### 返回值

|    类型    |
| :--------: |
| `Function` |
