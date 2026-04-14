---
category: Util
---

# download

Trigger browser download, supporting downloading via file `url`, `Blob`, `File`.

## Documentation

- [English](https://rattail.varletjs.org/util/download)
- [Chinese docs](https://rattail.varletjs.org/zh/util/download)

### Usage

```ts
import { download } from 'rattail'

download('/hello.txt', 'hello.txt')
download(new Blob(['hello']), 'hello.txt')
download(new File(['helle'], 'hello.txt', { type: 'text/plain' }), 'hello.txt')
```

### Arguments

| Arg        | Type                     | Defaults |
| ---------- | ------------------------ | -------- |
| `value`    | `string \| Blob \| File` |          |
| `filename` | `string`                 | `file`   |

## Type declarations

```ts
import { isString } from '../general'

export function download(val: string | Blob | File, filename: string = 'file') {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = isString(val) ? val : URL.createObjectURL(val)
  a.download = filename

  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(a.href)
  document.body.removeChild(a)
}
```
