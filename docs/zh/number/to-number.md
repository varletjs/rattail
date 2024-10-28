# toNumber

将输入值转换为数字。如果值为 `null` 或 `undefined`，返回 `0`。如果值为布尔值，`true` 转换为 `1`，`false` 转换为 `0`。如果值是字符串且不能解析为数字，返回 `0`

### 使用

```ts
import { toNumber } from 'rattail'

toNumber('123') // return 123
toNumber(true) // return 1
toNumber(false) // return 0
toNumber('abc') // return 0
toNumber(null) // return 0
```

### 参数列表

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型   |
| :------: |
| `number` |
