# merge

递归合并两个对象。

### 使用

```ts
import { merge } from 'rattail'

merge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })
// return { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

### 参数

| 参数         | 类型       | 默认值 |
| ------------ | ---------- | ------ |
| `object`     | `object`   |        |
| `...sources` | `object[]` |        |

### 返回值

| 类型     |
| -------- |
| `object` |
