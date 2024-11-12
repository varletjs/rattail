# differenceWith

创建一个不包含在其他给定数组中的数组值的 `数组`，并支持自定义比较函数。

### 使用

```ts
import { difference } from 'rattail'

differenceWith([{ num: 1 }, { num: 2 }, { num: 3 }], [{ num: 2 }], (a, b) => a.num === b.num)
// return [{ num: 1 }, { num: 3 }]
differenceWith([{ num: 1 }, { num: 2 }, { num: 3 }], [{ num: 2 }], [{ num: 3 }], (a, b) => a.num === b.num)
// return [{ num: 1 }]
```

### 参数

| 参数        | 类型                      | 默认值 |
| ----------- | ------------------------- | ------ |
| `arr`       | `Array`                   |        |
| `...values` | `Array<Array>`            |        |
| `fn`        | `(a: any, b: any) => any` |        |

### 返回值

| 类型    |
| ------- |
| `Array` |
