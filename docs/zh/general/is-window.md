# isWindow

判断输入值是否是全局 `window` 对象

### 使用

```ts
import { isWindow } from 'rattail'

isWindow(window) // return true
isWindow({}) // return false
```

### 参数列表

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
