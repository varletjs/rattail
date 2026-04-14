---
category: Util
---

# copyText

Copies text to the clipboard.

## Documentation

- [English](https://rattail.varletjs.org/util/copy-text)
- [Chinese docs](https://rattail.varletjs.org/zh/util/copy-text)

### Usage

```js
import { copyText } from 'rattail'

copyText('Hello, clipboard!') // The string will be written to the clipboard
```

### Arguments

| Arg    | Type     | Defaults |
| ------ | -------- | -------- |
| `text` | `string` |          |

### Return

| Type |
| ---- |
| `-`  |

## Type declarations

```ts
export function copyText(value: string) {
  if (!value) {
    return
  }

  const textArea = document.createElement('textarea')
  textArea.value = value
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}
```
