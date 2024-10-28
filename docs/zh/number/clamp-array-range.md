# clampArrayRange

将索引限制在数组长度的范围内。确保索引至少为 `0`，最大为 `arr.length - 1`

### 使用

```ts
import { clampArrayRange } from 'rattail'

const arr = ['a', 'b', 'c']
clampArrayRange(1, arr) // return 1
clampArrayRange(-1, arr) // return 0
clampArrayRange(5, arr) // return 2
```

### 参数列表

| 参数    |   类型   | 默认值 |
| ------- | :------: | -----: |
| `index` | `number` |        |
| `arr`   | `Array`  |        |

### 返回值

|   类型   |
| :------: |
| `number` |
