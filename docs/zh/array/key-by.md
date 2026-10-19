# keyBy

以 `keyFn` 的返回值作为键，将 `数组` 转换为 `对象`。传入 `valueFn` 时，用它的返回值代替元素本身作为值。每个键只保留一个值，键相同时后出现的元素覆盖先出现的。如需保留同一个键下的所有元素，请使用 `groupBy`。

### 使用

```ts
import { keyBy } from 'rattail'

const users = [
  { uuid: 'a', name: 'Alice' },
  { uuid: 'b', name: 'Bob' },
]

keyBy(users, (user) => user.uuid)
// return { a: { uuid: 'a', name: 'Alice' }, b: { uuid: 'b', name: 'Bob' } }
keyBy(
  users,
  (user) => user.uuid,
  (user) => user.name,
)
// return { a: 'Alice', b: 'Bob' }
```

### 参数

| 参数      | 类型                                        | 默认值   |
| --------- | ------------------------------------------- | -------- |
| `arr`     | `Array`                                     |          |
| `keyFn`   | `(item: any, index: number) => PropertyKey` |          |
| `valueFn` | `(item: any, index: number) => any`         | 元素本身 |

### 返回值

| 类型     |
| -------- |
| `object` |
