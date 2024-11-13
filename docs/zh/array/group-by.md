# groupBy

对给定的 `数组` 中的元素进行分组，传递的函数的返回值将用作分组的键。

### 使用

```ts
import { groupBy } from 'rattail'

groupBy([1, 2, 3, 4, 5], (num) => (num % 2 === 0 ? 'even' : 'odd'))
// return { odd: [1, 3, 5], even: [2, 4] }
groupBy(
  [
    { name: 'a', gender: 'female' },
    { name: 'b', gender: 'female' },
    { name: 'c', gender: 'male' },
  ],
  (val) => val.gender,
)
// return {
//   female: [
//     { name: 'a', gender: 'female' },
//     { name: 'b', gender: 'female' },
//   ],
//   male: [{ name: 'c', gender: 'male' }],
// }
```

### 参数

| 参数  | 类型                | 默认值 |
| ----- | ------------------- | ------ |
| `arr` | `Array`             |        |
| `fn`  | `(val: any) => any` |        |

### 返回值

| 类型     |
| -------- |
| `object` |
