# sample

从`数组`中返回一个随机元素。如果数组为空，则返回 `undefined`。

### 使用

```ts
import { sample } from 'rattail'

sample([1, 2, 3, 4, 5]) // return 一个随机元素，例如 3
sample([]) // return undefined
```

### 参数列表

| 参数  | 类型  | 默认值 |
| ----- | :---: | -----: |
| `arr` | `T[]` |        |

### 返回值

|       类型        |
| :---------------: |
| `T  \| undefined` |
