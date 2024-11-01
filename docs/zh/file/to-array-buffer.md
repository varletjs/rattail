# toArrayBuffer

将 `File` 对象转换为 `ArrayBuffer`。

### 用法

```ts
import { toArrayBuffer } from 'rattail'

const file = new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' })
toArrayBuffer(file).then((arrayBuffer) => {
  console.log(arrayBuffer)
})
```

### 参数

| 参数   | 类型   | 默认值 |
| ------ | ------ | ------ |
| `file` | `File` |        |

### 返回值

| 类型                   |
| ---------------------- |
| `Promise<ArrayBuffer>` |
