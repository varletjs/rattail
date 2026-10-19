---
category: String
---

# splitLines

Split a `string` into lines, optionally trimming each line and removing empty ones.

## Documentation

- [English](https://rattail.varletjs.org/string/split-lines)
- [Chinese docs](https://rattail.varletjs.org/zh/string/split-lines)

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

## Type declarations

```ts
export interface SplitLinesOptions {
  trim?: boolean
  compact?: boolean
}

export function splitLines(text: string, options: SplitLinesOptions = {}): string[] {
  const { trim = false, compact = false } = options
  const lines = text.split(/\r\n|\r|\n/)
  const normalizedLines = trim ? lines.map((line) => line.trim()) : lines

  return compact ? normalizedLines.filter((line) => line !== '') : normalizedLines
}
```
