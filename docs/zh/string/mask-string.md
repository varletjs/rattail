# maskString

遮盖字符串的中间部分，仅保留前缀和后缀可见。适用于隐藏邀请码、令牌、手机号等敏感信息。对于较短的字符串，会自动缩减 suffix 和 prefix 以确保至少遮盖一个字符。

### 用法

```ts
import { maskString } from 'rattail'

maskString('abcdefgh') // 'ab****gh'
maskString('abcdefgh', { prefix: 3, suffix: 1 }) // 'abc****h'
maskString('abcdefgh', { mask: '#' }) // 'ab####gh'
maskString('abcdefgh', { maskLength: 4 }) // 'ab****gh'
maskString('abcdefghijkl', { maskLength: 4 }) // 'ab****kl'
maskString('abcd') // 'ab*d'（短文本：自动缩减 suffix 以确保至少 mask 1 个字符）
maskString('ab') // 'a*'（极短文本：prefix 也会缩减）
maskString('a') // 'a'（长度 <= 1 时原样返回）
```

### 参数

| 参数                 | 类型     | 默认值 | 说明                                             |
| -------------------- | -------- | ------ | ------------------------------------------------ |
| `text`               | `string` |        | 需要遮盖的文本                                   |
| `options`            | `object` | `{}`   | 遮盖选项                                         |
| `options.prefix`     | `number` | `2`    | 保留开头的字符数                                 |
| `options.suffix`     | `number` | `2`    | 保留末尾的字符数                                 |
| `options.mask`       | `string` | `'*'`  | 用于遮盖的字符                                   |
| `options.maskLength` | `number` | -      | 固定遮盖字符数量（设置后将忽略实际中间部分长度） |

### 返回值

| 类型     |
| -------- |
| `string` |
