# isFile

判断输入值是否是 `File`。

### 使用

```ts
import { isFile } from 'rattail'

isFile(new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' }))
// return true
```

### 参数

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
