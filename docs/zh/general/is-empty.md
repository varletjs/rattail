# isEmpty

判断输入值是否为空（undefined、null、空字符串或空数组）

### 使用

```ts
import { isEmpty } from 'rattail'

isEmpty(null) // return true
isEmpty('') // return true
isEmpty([]) // return true
isEmpty([1, 2, 3]) // return false
```

### 参数列表

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
