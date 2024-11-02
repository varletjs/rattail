# cancelAnimationFrame

使用给定的句柄取消 `requestAnimationFrame` 请求，并使用 `clearTimeout` 作为回退选项。

### 使用

```ts
import { cancelAnimationFrame } from 'rattail'

const handle = requestAnimationFrame(() => {})
cancelAnimationFrame(handle)
```

### 参数

| 参数     | 类型     | 默认值 |
| -------- | -------- | ------ |
| `handle` | `number` |        |

### 返回值

| 类型   |
| ------ |
| `void` |
