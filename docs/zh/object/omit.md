# omit

排除对象属性并构造成一个新的对象。

### 使用

```ts
import { omit } from 'rattail'

omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])
// return { b: 2 }
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
