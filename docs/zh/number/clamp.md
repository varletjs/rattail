# clamp

将数字限制在 `min` 和 `max` 的范围内。如果数字小于 `min`，则返回 `min`；如果大于 `max`，则返回 `max`

### 使用

```ts
import { clamp } from 'rattail'

clamp(5, 1, 10) // return 5
clamp(0, 1, 10) // return 1
clamp(15, 1, 10) // return 10
```

### 参数

| 参数  |   类型   | 默认值 |
| ----- | :------: | -----: |
| `num` | `number` |        |
| `min` | `number` |        |
| `max` | `number` |        |

### 返回值

|   类型   |
| :------: |
| `number` |
