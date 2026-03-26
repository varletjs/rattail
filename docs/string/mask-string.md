# maskString

Masks the middle part of a string, keeping only the prefix and suffix visible. Useful for hiding sensitive information like invite codes, tokens, or phone numbers. For short strings, suffix and prefix are automatically reduced to ensure at least one character is masked.

### Usage

```ts
import { maskString } from 'rattail'

maskString('abcdefgh') // 'ab****gh'
maskString('abcdefgh', { prefix: 3, suffix: 1 }) // 'abc****h'
maskString('abcdefgh', { mask: '#' }) // 'ab####gh'
maskString('abcdefgh', { maskLength: 4 }) // 'ab****gh'
maskString('abcdefghijkl', { maskLength: 4 }) // 'ab****kl'
maskString('abcd') // 'ab*d' (short text: suffix reduced to ensure at least 1 mask)
maskString('ab') // 'a*' (very short: prefix reduced too)
maskString('a') // 'a' (length <= 1, returned as-is)
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
