# maskText

Masks the middle part of a string, keeping only the prefix and suffix visible. Useful for hiding sensitive information like invite codes, tokens, or phone numbers.

### Usage

```ts
import { maskText } from 'rattail'

maskText('abcdefgh') // 'ab****gh'
maskText('abcdefgh', { prefix: 3, suffix: 1 }) // 'abc****h'
maskText('abcdefgh', { mask: '#' }) // 'ab####gh'
maskText('abcdefgh', { maskLength: 4 }) // 'ab****gh'
maskText('abcdefghijkl', { maskLength: 4 }) // 'ab****kl'
maskText('abcd') // 'ab*d' (short text: suffix reduced to ensure at least 1 mask)
maskText('ab') // 'a*' (very short: prefix reduced too)
maskText('a') // 'a' (length <= 1, returned as-is)
```

### Arguments

| Arg                  | Type     | Default | Description                                                                   |
| -------------------- | -------- | ------- | ----------------------------------------------------------------------------- |
| `text`               | `string` |         | The text to mask                                                              |
| `options`            | `object` | `{}`    | Masking options                                                               |
| `options.prefix`     | `number` | `2`     | Number of characters to keep at the start                                     |
| `options.suffix`     | `number` | `2`     | Number of characters to keep at the end                                       |
| `options.mask`       | `string` | `'*'`   | The character used for masking                                                |
| `options.maskLength` | `number` | -       | Fixed number of mask characters (overrides the calculated length if provided) |

### Return

| Type     |
| -------- |
| `string` |
