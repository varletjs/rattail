# objectKeys

获取对象的键数组，具备完整的 TypeScript 类型支持。

### 使用

```ts
import { objectKeys } from 'rattail'

const obj = { a: 1, b: 2 }
const keys = objectKeys(obj)
// keys = ['a', 'b']
```

### 参数

| 参数     | 类型     |
| -------- | -------- |
| `object` | `object` |

### 返回值

| 类型            |
| --------------- |
| `Array<string>` |

### 注意事项

- 返回值对输入对象类型完全类型安全。
- 类似于 `Object.keys`，但 TypeScript 支持更好。
