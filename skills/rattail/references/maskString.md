---
category: String
---

# maskString

Mask part of a string with a specified character, keeping prefix and suffix visible.

## Documentation

- [English](https://rattail.varletjs.org/string/mask-string)
- [Chinese docs](https://rattail.varletjs.org/zh/string/mask-string)

### Usage

```ts
import { maskString } from 'rattail'

maskString('13812345678') // '13*******78'
maskString('13812345678', { prefix: 3, suffix: 4 }) // '138****5678'
maskString('hello', { mask: '#' }) // 'he#lo'
maskString('hello', { prefix: 1, suffix: 1, maskLength: 5 }) // 'h*****o'
```

### Arguments

| Arg       |        Type         | Defaults |
| --------- | :-----------------: | -------: |
| `text`    |      `string`       |          |
| `options` | `MaskStringOptions` |     `{}` |

#### `MaskStringOptions`

| Field        |   Type   | Default | Description                                          |
| ------------ | :------: | ------: | ---------------------------------------------------- |
| `prefix`     | `number` |     `2` | Number of characters to keep visible at the start    |
| `suffix`     | `number` |     `2` | Number of characters to keep visible at the end      |
| `mask`       | `string` |   `'*'` | Character used for masking                           |
| `maskLength` | `number` |    auto | Fixed mask length (overrides auto-calculated length) |

### Return

|   Type   |
| :------: |
| `string` |

## Type declarations

```ts
export interface MaskStringOptions {
  prefix?: number
  suffix?: number
  mask?: string
  maskLength?: number
}

export function maskString(
  text: string,
  { prefix = 2, suffix = 2, mask = '*', maskLength }: MaskStringOptions = {},
): string
```
