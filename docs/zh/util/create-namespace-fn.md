# createNamespaceFn

创建一个命名空间函数，用于生成 BEM 样式的组件和类名。

### 使用

```ts
import { createNamespaceFn } from 'rattail'

const ns = createNamespaceFn('my-app')
const bem = ns('button')
console.log(bem.n('--active'))
```

### 参数

| 参数        | 类型     | 默认值 |
| ----------- | -------- | ------ |
| `namespace` | `string` |        |

### 返回值

| 类型                                               |
| -------------------------------------------------- |
| `{ name: string; n: Function; classes: Function }` |
