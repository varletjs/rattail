# isDOMException

判断输入值是否为 `DOMException` 对象。

### 使用

```ts
import { isDOMException } from 'rattail'

isDOMException(new DOMException('An error occurred')) // return true
isDOMException(new Error('An error occurred')) // return false
```

### 参数列表

| 参数  | 类型  | 默认值 |
| ----- | :---: | -----: |
| `val` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
