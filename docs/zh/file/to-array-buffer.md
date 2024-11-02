# toArrayBuffer

将 `File` 对象转换为 `ArrayBuffer`。

### 使用

```ts
import { toArrayBuffer } from 'rattail'

await toArrayBuffer(new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' }))
// return ArrayBuffer
```

### 参数

| 参数   | 类型   | 默认值 |
| ------ | ------ | ------ |
| `file` | `File` |        |

### 返回值

| 类型                   |
| ---------------------- |
| `Promise<ArrayBuffer>` |
