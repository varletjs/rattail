# isPrimitive

判断输入值是否是 `基本数据类型`.

### 使用

```ts
import { isPrimitive } from 'rattail'

isPrimitive(1) // return true
isPrimitive('1') // return true
isPrimitive(null) // return true
isPrimitive(undefined) // return true
isPrimitive(true) // return true
isPrimitive(Symbol('1')) // return true
isPrimitive(1n) // return true
isPrimitive({}) // return false
isPrimitive([]) // return false
isPrimitive(new Date()) // return false
```

### 参数

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
