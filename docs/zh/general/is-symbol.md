# isSymbol

判断输入值是否是 `符号`。

### 使用

```ts
import { isSymbol } from 'rattail'

isSymbol(Symbol('test')) // return true
isSymbol('rattail') // return false
```

### 参数列表

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
