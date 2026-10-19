# splitLines

Splits a `string` into lines, supporting `\n`, `\r\n` and `\r` line breaks. Like `String.prototype.split`, a trailing line break produces a trailing empty string. `compact` only removes lines that are exactly empty, so enable `trim` as well to also remove whitespace-only lines.

### Usage

```ts
import { splitLines } from 'rattail'

splitLines('a\r\nb\nc')
// return ['a', 'b', 'c']
splitLines(' a \n\n b \n', { trim: true })
// return ['a', '', 'b', '']
splitLines(' a \n\n b \n', { trim: true, compact: true })
// return ['a', 'b']
```

### Arguments

| Arg               | Type      | Default | Description                                         |
| ----------------- | --------- | ------- | --------------------------------------------------- |
| `text`            | `string`  |         | The text to split                                   |
| `options`         | `object`  | `{}`    | Split options                                       |
| `options.trim`    | `boolean` | `false` | Trim each line                                      |
| `options.compact` | `boolean` | `false` | Remove empty lines, checked after `trim` is applied |

### Return

| Type       |
| ---------- |
| `string[]` |
