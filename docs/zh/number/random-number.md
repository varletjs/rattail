# randomNumber

生成一个在 `min` 和 `max` 范围内的随机整数（包含 `min` 和 `max`）。如果没有提供值，默认为 `0` 到 `100` 的范围。

### 使用

```ts
import { randomNumber } from 'rattail'

randomNumber(1, 10) // return 1 到 10 之间的随机整数
randomNumber() // return 0 或 100（默认范围）
```

### 参数列表

| 参数  |   类型   | 默认值 |
| ----- | :------: | -----: |
| `min` | `number` |    `0` |
| `max` | `number` |  `100` |

### 返回值

|   类型   |
| :------: |
| `number` |
