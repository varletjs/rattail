# isTruthy

判断输入值是否为真值

### 使用

```ts
import { isTruthy } from 'rattail'

isTruthy(1) // return true
isTruthy([]) // return true
isTruthy({}) // return true
isTruthy(0) // return false
isTruthy('') // return false
isTruthy(null) // return false
isTruthy(undefined) // return false
```

### 参数列表

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
