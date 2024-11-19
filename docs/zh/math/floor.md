# floor

返回向下取整到指定精度的数字。

### 使用

```ts
import { floor } from 'rattail'

floor(1.005) // return 1
floor(1.0015, 3) // return 1.001
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
