# isBlob

判断输入值是否是 `Blob`。

### 使用

```ts
import { isBlob } from 'rattail'

isBlob(new Blob(['Hello, World!'], { type: 'text/plain' })) // return true
```

### 参数

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
