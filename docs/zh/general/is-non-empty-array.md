# isNonEmptyArray

判断输入值是否为 `非空数组`。

### 使用

```ts
import { isNonEmptyArray } from 'rattail'

isNonEmptyArray([1, 2, 3]) // return true
isNonEmptyArray([]) // return false
isNonEmptyArray(1) // return false
isNonEmptyArray(null) // return false
isNonEmptyArray(undefined) // return false
```

### 参数列表

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
