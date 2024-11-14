# xorWith

对传入的数组进行异或(Exclusive OR)计算，返回一个新的 `数组`，并支持自定义比较函数。

### 使用

```ts
import { xorWith } from 'rattail'

xorWith([{ num: 1 }, { num: 2 }, { num: 2 }], [{ num: 1 }, { num: 3 }], (a, b) => a.num === b.num)
// return [{ num: 2 }, { num: 3 }]
xorWith([{ num: 1 }, { num: 2 }], [{ num: 1 }, { num: 2 }], [{ num: 3 }], (a, b) => a.num === b.num)
// return [{ num: 3 }]
```

### 参数

| 参数        | 类型                      | 默认值 |
| ----------- | ------------------------- | ------ |
| `...values` | `Array<Array>`            |        |
| `fn`        | `(a: any, b: any) => any` |        |

### 返回值

| 类型    |
| ------- |
| `Array` |
