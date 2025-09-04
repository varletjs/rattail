# set

在对象的指定路径设置值，必要时会自动创建嵌套的对象或数组。

### 使用

```ts
import { set } from 'rattail'

const obj = {}
set(obj, ['a', 'b', 'c'], 123)
// obj = { a: { b: { c: 123 } } }

set(obj, ['x', 0, 'y'], 'hello')
// obj = { a: { b: { c: 123 } }, x: [ { y: 'hello' } ] }
```

### 参数

| 参数     | 类型                      | 默认值  |
| -------- | ------------------------- | ------- |
| `object` | `object`                  | `any[]` |
| `path`   | `Array<string \| number>` |
| `value`  | `any`                     |         |

### 返回值

| 类型   |
| ------ |
| `void` |
