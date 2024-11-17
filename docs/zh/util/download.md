# download

触发浏览器下载，支持通过 `文件地址`、`Blob`、`File`。

### 使用

```ts
import { download } from 'rattail'

download('/hello.txt', 'hello.txt')
download(new Blob(['hello']), 'hello.txt')
download(new File(['helle'], 'hello.txt', { type: 'text/plain' }), 'hello.txt')
```

### 参数

| 参数       | 类型                     | 默认值 |
| ---------- | ------------------------ | ------ |
| `value`    | `string \| Blob \| File` |        |
| `filename` | `string`                 |        |
