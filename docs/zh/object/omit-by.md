# omitBy

通过提供一个函数来排除对象属性并构造成一个新的对象， 返回 `真值` 表示需要排除该属性。

### 使用

```ts
import { omitBy } from 'rattail'

omitBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
// return { a: 1 }
omitBy({ a: 1, b: 2, c: 3 }, (value, key) => key !== 'a')
// return { a: 1 }
```

### 参数

| 参数     | 类型                               | 默认值 |
| -------- | ---------------------------------- | ------ |
| `object` | `object`                           |        |
| `fn`     | `(value: any, key: string) => any` |        |

### 返回值

| 类型     |
| -------- |
| `object` |
