# isPromise

判断输入值是否是 `Promise`。

### 使用

```ts
import { isPromise } from 'rattail'

isPromise(Promise.resolve()) // return true
isPromise({}) // return false
```

### 参数列表

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
