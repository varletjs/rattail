# cloneDeepWith

创建一个值的深拷贝，并为每个值应用一个自定义函数来处理克隆。

### 使用

```ts
import { cloneDeepWith, isNumber } from 'rattail'

const original = { a: 1, b: { c: 2 } }
const value = cloneDeepWith(original, (val) => {
  if (isNumber(val)) {
    return val * 2
  }
})
// value: { a: 2, b: { c: 4 } }
```

### 参数

| 参数    |         类型          | 默认值 |
| ------- | :-------------------: | -----: |
| `value` |         `any`         |        |
| `fn`    | `(value: any) => any` |        |

### 返回值

| 类型  |
| :---: |
| `any` |
