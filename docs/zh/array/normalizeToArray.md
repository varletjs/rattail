# normalizeToArray

将值转换为数组，如果输入已经是数组，则直接返回输入值。

### 使用

```ts
import { normalizeToArray } from 'rattail'

normalizeToArray(5) // return [5]
normalizeToArray([1, 2, 3]) // return [1, 2, 3]
```

### 参数

| 参数    | 类型  | 默认值 |
| ------- | ----- | ------ |
| `value` | `any` |        |

### 返回值

| 类型    |
| ------- |
| `Array` |
