# toDataURL

将 `File` 对象转换为 Data URL 字符串。

### 用法

```ts
import { toDataURL } from 'rattail'

await toDataURL(new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' }))
// return 'data:text/plain;base64,SGVsbG8sIHdvcmxkIQ=='
```

### 参数

| 参数   | 类型   | 默认值 |
| ------ | ------ | ------ |
| `file` | `File` |        |

### 返回值

| 类型              |
| ----------------- |
| `Promise<string>` |
