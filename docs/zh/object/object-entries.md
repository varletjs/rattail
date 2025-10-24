# objectEntries

获取对象的键值对数组，具备完整的 TypeScript 类型支持。

### 使用

```ts
import { objectEntries } from 'rattail'

const obj = { a: 1, b: 2 }
const entries = objectEntries(obj)
// entries = [['a', 1], ['b', 2]]
```

### 参数

| 参数     | 类型     |
| -------- | -------- |
| `object` | `object` |

### 返回值

| 类型                   |
| ---------------------- |
| `Array<[string, any]>` |

### 注意事项

- 返回值对输入对象类型完全类型安全。
- 类似于 `Object.entries`，但 TypeScript 支持更好。
