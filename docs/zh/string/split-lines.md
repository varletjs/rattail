# splitLines

将 `字符串` 按行拆分，支持 `\n`、`\r\n` 和 `\r` 换行符。与 `String.prototype.split` 一致，文本以换行符结尾时，结果末尾会多出一个空字符串。`compact` 只移除完全为空的行，如需同时移除只含空白的行，请一并开启 `trim`。

### 使用

```ts
import { splitLines } from 'rattail'

splitLines('a\r\nb\nc')
// return ['a', 'b', 'c']
splitLines(' a \n\n b \n', { trim: true })
// return ['a', '', 'b', '']
splitLines(' a \n\n b \n', { trim: true, compact: true })
// return ['a', 'b']
```

### 参数

| 参数              | 类型      | 默认值  | 说明                                     |
| ----------------- | --------- | ------- | ---------------------------------------- |
| `text`            | `string`  |         | 要拆分的文本                             |
| `options`         | `object`  | `{}`    | 拆分选项                                 |
| `options.trim`    | `boolean` | `false` | 去除每行首尾空白                         |
| `options.compact` | `boolean` | `false` | 移除空行，在 `trim` 处理之后判断是否为空 |

### 返回值

| 类型       |
| ---------- |
| `string[]` |
