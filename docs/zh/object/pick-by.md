# pickBy

通过提供一个函数来提取对象属性并构造成一个新的对象, 返回 `真值` 表示需要提取该属性。

### 使用

```ts
import { pickBy } from 'rattail'

pickBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
// return { b: 2, c: 3 }
pickBy({ a: 1, b: 2, c: 3 }, (value, key) => key !== 'a')
// return { b: 2, c: 3 }
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
