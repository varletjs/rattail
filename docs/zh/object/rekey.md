# rekey

通过映射重命名对象属性并构造成一个新的对象。

### 使用

```ts
import { rekey } from 'rattail'

rekey({ a: 1, b: 2, c: 3 }, { a: 'x', c: 'z' })
// return { x: 1, b: 2, z: 3 }
```

### 参数

| 参数      | 类型     | 默认值 |
| --------- | -------- | ------ |
| `object`  | `object` |        |
| `mapping` | `object` |        |

### 返回值

| 类型     |
| -------- |
| `object` |
