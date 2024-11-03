# sumHash

为给定的值计算一个哈希值。哈希值是基于值的属性和内容生成的，并返回哈希的十六进制字符串表示。

### 使用

```ts
import { sumHash } from 'rattail'

sumHash('123')
// return '1a3a267c'
sumHash({ a: '123' })
// return 'b1c920ac'
```

### 参数列表

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型   |
| :------: |
| `string` |
