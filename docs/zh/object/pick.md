# pick

提取对象属性并构造成一个新的对象。

### 使用

```ts
import { pick } from 'rattail'

pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
// return { a: 1, c: 3 }
```

### 参数

| 参数     | 类型       | 默认值 |
| -------- | ---------- | ------ |
| `object` | `object`   |        |
| `keys`   | `string[]` |        |

### 返回值

| 类型     |
| -------- |
| `object` |
