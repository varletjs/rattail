# genStringKey

生成一个唯一的`字符串键`，通过递增数字值并将其转换为字符串。

### 使用

```ts
import { genStringKey } from 'rattail'

genStringKey() // return 'generated-key-0'
genStringKey() // return 'generated-key-1'
genStringKey() // return 'generated-key-2'
```

### 返回值

|   类型   |
| :------: |
| `string` |
