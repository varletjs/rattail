# rekey

通过映射重命名对象属性并构造成一个新的对象。

### 使用

```ts
import { rekey } from 'rattail'

rekey({ a: 1, b: 2, c: 3 }, { a: 'x', c: 'z' })
// return { x: 1, b: 2, z: 3 }
```

```ts
const id = Symbol('id')
const key = Symbol('key')

rekey(
  {
    [id]: 1,
    name: 'rattail',
  },
  { [id]: key, name: 'label' },
)
// return { [key]: 1, label: 'rattail' }
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

### 注意事项

- 会返回一个新对象，不会修改原对象。
- `mapping` 中未声明的键会按原样保留。
- 同时支持字符串键和 `symbol` 键。
- 如果多个源键映射到同一个目标键，后面的键会覆盖前面的值。
