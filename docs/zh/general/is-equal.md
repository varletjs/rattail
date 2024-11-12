# isEqual

深度比较两个值。

### 使用

```ts
import { isEqual } from 'rattail'

isEqual({ n: 1 }, { n: 1 })
// return true
isEqual([1, 2, 3], [1, 2, 3])
// return true
```

### 参数

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |
| `other` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
