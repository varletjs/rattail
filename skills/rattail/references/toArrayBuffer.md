---
category: File
---

# toArrayBuffer

Converts a `File` object to an `ArrayBuffer`.

## Documentation

- [English](https://rattail.varletjs.org/file/to-array-buffer)
- [Chinese docs](https://rattail.varletjs.org/zh/file/to-array-buffer)

### Usage

```ts
import { toArrayBuffer } from 'rattail'

await toArrayBuffer(new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' }))
// return ArrayBuffer
```

### Arguments

| Arg    | Type   | Defaults |
| ------ | ------ | -------- |
| `file` | `File` |          |

### Return

| Type                   |
| ---------------------- |
| `Promise<ArrayBuffer>` |

## Type declarations

```ts
export function toArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      resolve(fileReader.result as ArrayBuffer)
    }

    fileReader.readAsArrayBuffer(file)
  })
}
```
