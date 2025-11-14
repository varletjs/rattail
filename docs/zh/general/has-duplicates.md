# hasDuplicates

判断数组中是否存在重复值。

### 使用

```ts
import { hasDuplicates } from 'rattail'

hasDuplicates([1, 2, 3, 2]) // true
hasDuplicates([1, 2, 3]) // false
```

### 参数

| 参数  | 类型    | 默认值 |
| ----- | ------- | ------ |
| `arr` | `Array` |        |

### 返回值

| 类型      |
| --------- |
| `boolean` |

### 注意事项

- 如果数组中有任意值出现多次，则返回 `true`。
- 使用严格相等进行比较。
