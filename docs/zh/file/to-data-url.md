# toDataURL

将 `File` 对象转换为 Data URL 字符串。

### 用法

```ts
import { toDataURL } from 'rattail'

const file = new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' })
toDataURL(file).then((dataUrl) => {
  console.log(dataUrl)
})
```

### 参数

| 参数   | 类型   | 默认值 |
| ------ | ------ | ------ |
| `file` | `File` |        |

### 返回值

| 类型              |
| ----------------- |
| `Promise<string>` |
