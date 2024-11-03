# copyText

复制文本到剪贴板

### 用法

```js
import { copyText } from 'rattail'

copyText('Hello, clipboard!') // 返回 undefined
copyText('') // 输出警告信息并返回 { success: false }
```

### 参数

| 参数   | 类型     | 默认值 |
| ------ | -------- | ------ |
| `text` | `string` |        |

### 返回值

| 类型                                                 |
| ---------------------------------------------------- |
| `{ success: boolean; error?: Error; } \|  undefined` |
