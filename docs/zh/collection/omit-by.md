# omitBy

通过提供的谓词函数排除键值对来创建新对象。

### 使用

```ts
import { omitBy } from 'rattail'

omitBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
// return { a: 1 }
```

### 参数

| 参数     | 类型                                   | 默认值 |
| -------- | -------------------------------------- | ------ |
| `object` | `object`                               |        |
| `fn`     | `(value: any, key: string) => boolean` |        |

### 返回值

| 类型     |
| -------- |
| `object` |
