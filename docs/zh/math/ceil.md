# ceil

返回向上取整到指定精度的数字。

### 使用

```ts
import { ceil } from 'rattail'

ceil(1.004) // return 2
ceil(1.004, 2) // return 1.01
```

### 参数

| 参数        |   类型   | 默认值 |
| ----------- | :------: | -----: |
| `val`       | `number` |        |
| `precision` | `number` |    `0` |

### 返回值

|   类型   |
| :------: |
| `number` |
