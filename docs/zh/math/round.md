# round

返回四舍五入到指定精度的数字。

### 使用

```ts
import { round } from 'rattail'

round(1.005) // return 1
round(1.005, 2) // return 1.01
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
