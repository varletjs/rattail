# once

创建一个只会执行一次的函数。后续调用将返回第一次调用的结果。

### 使用

```ts
import { once } from 'rattail'

const fn = once(() => 'initialized')
fn() // return 'initialized'
fn() // return 'initialized'
```

### 参数

| 参数 |    类型    | 默认值 |
| ---- | :--------: | -----: |
| `fn` | `Function` |        |

### 返回值

|    类型    |
| :--------: |
| `Function` |
