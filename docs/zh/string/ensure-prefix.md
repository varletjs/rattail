# ensurePrefix

确保 `字符串` 存在某个前缀，如果不存在则添加该前缀。

### 使用

```ts
import { ensurePrefix } from 'rattail'

ensurePrefix('prefix-hello-world', 'prefix-') // return 'prefix-hello-world'
ensurePrefix('hello-world', 'prefix-') // return 'prefix-hello-world'
```

### 参数

| 参数     |   类型   | 默认值 |
| -------- | :------: | -----: |
| `value`  | `string` |        |
| `prefix` | `string` |        |

### 返回值

|   类型   |
| :------: |
| `string` |
