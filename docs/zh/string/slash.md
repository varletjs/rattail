# slash

将路径中的所有反斜杠 (`\`) 转换为正斜杠 (`/`)。如果路径以 `\\?\` 开头（表示扩展长度路径），则保持不变。

### 使用

```ts
import { slash } from 'rattail'

slash('C:\\path\\to\\file')
// return 'C:/path/to/file'

slash('\\\\?\\C:\\path\\to\\file')
// return '\\\\?\\C:\\path\\to\\file' (保持不变)
```

### 参数列表

| 参数   |   类型   | 默认值 |
| ------ | :------: | -----: |
| `path` | `string` |        |

### 返回值

|   类型   |
| :------: |
| `string` |
