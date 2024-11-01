# cloneDeep

创建一个值的深拷贝。

### 使用

```ts
import { cloneDeep } from 'rattail'

const original = { a: 1, b: { c: 2 } }
const value = cloneDeep(original)
// value: { a: 1, b: { c: 2 } }
```

### 参数列表

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

| 类型  |
| :---: |
| `any` |
