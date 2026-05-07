# deriveKey

通过映射派生对象属性并构造成一个新的对象。

适用于需要保留原字段，同时在结果中补充额外派生字段的场景。

### 使用

```ts
import { deriveKey } from 'rattail'

deriveKey({ value: 1, label: 'Option A' }, { label: 'tooltip' })
// return { value: 1, label: 'Option A', tooltip: 'Option A' }
```

```ts
const options = [{ value: 'a', label: 'Option A' }]

options.map((option) => deriveKey(option, { label: 'tooltip' }))
// return [{ value: 'a', label: 'Option A', tooltip: 'Option A' }]
```

```ts
const id = Symbol('id')
const key = Symbol('key')

deriveKey(
  {
    [id]: 1,
    name: 'rattail',
  },
  { [id]: key, name: 'label' },
)
// return { [id]: 1, [key]: 1, name: 'rattail', label: 'rattail' }
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
- 如果派生后的目标键已存在，派生的值会覆盖原值。
- 与 `rekey` 不同，`deriveKey` 会保留原字段，并额外补充新字段。
