# intersectionWith

创建一个去重数组，数组中的每个值都被包含在所有的给定数组中（数组取交集），支持传入比较函数。

### 使用

```ts
import { intersectionWith } from 'rattail'

intersectionWith(
  [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 3 }],
  [{ num: 2 }, { num: 3 }, { num: 4 }],
  (a, b) => a.num === b.num,
)
// return [{ num: 2 }, { num: 3 }]
intersectionWith(
  [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 3 }],
  [{ num: 2 }, { num: 3 }, { num: 4 }],
  [{ num: 3 }, { num: 4 }, { num: 5 }],
  (a, b) => a.num === b.num,
)
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
