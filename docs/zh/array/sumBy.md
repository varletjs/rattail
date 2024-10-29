# sumBy

根据提供的函数计算数组中各项值的和。

### 使用

```ts
import { sumBy } from 'rattail'

sumBy([{ n: 1 }, { n: 2 }, { n: 3 }], (item) => item.n) // return 6
```

### 参数

| 参数  | 类型                   | 默认值 |
| ----- | ---------------------- | ------ |
| `arr` | `Array`                |        |
| `fn`  | `(val: any) => number` |        |

### 返回值

| 类型     |
| -------- |
| `number` |
