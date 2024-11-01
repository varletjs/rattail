# toText

将 `File` 对象转换为文本字符串。

### 用法

```ts
import { toText } from 'rattail'

const file = new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' })
toText(file).then((text) => {
  console.log(text)
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
