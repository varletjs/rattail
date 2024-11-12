# ensureSuffix

确保 `字符串` 存在某个后缀，如果不存在则添加该后缀。

### 使用

```ts
import { ensureSuffix } from 'rattail'

ensureSuffix('hello-world-suffix', '-suffix') // return 'hello-world-suffix'
ensureSuffix('hello-world', '-suffix') // return 'hello-world-suffix'
```

### 参数

| 参数     |   类型   | 默认值 |
| -------- | :------: | -----: |
| `value`  | `string` |        |
| `suffix` | `string` |        |

### 返回值

|   类型   |
| :------: |
| `string` |
