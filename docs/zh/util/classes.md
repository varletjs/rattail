# classes

根据给定条件生成类名列表，或直接返回类名。

### 用法

```ts
import { classes } from 'rattail'

classes('a', [true, 'b', 'c'])
// return ['a', 'b']
classes('a', [false, 'b', 'c'])
// return ['a', 'c']
```

### 参数

| 参数      | 类型              | 默认值 |
| --------- | ----------------- | ------ |
| `...args` | `string \| Array` |        |

### 返回值

| 类型    |
| ------- |
| `any[]` |
