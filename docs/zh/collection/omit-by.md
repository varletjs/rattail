# omitBy

通过提供的谓词函数排除键值对来创建新对象。

### 使用

```ts
import { omitBy } from 'rattail'

const picked = omitBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
console.log(picked) // { a: 1 }
```

### 参数

| 参数        | 类型                                   | 默认值 |
| ----------- | -------------------------------------- | ------ |
| `object`    | `object`                               |        |
| `predicate` | `(value: any, key: string) => boolean` |        |

### 返回值

| 类型     |
| -------- |
| `object` |
