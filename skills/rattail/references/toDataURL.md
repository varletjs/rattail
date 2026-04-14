---
category: File
---

# toDataURL

Converts a `File` object to a Data URL string.

## Documentation

- [English](https://rattail.varletjs.org/file/to-data-url)
- [Chinese docs](https://rattail.varletjs.org/zh/file/to-data-url)

### Usage

```ts
import { toDataURL } from 'rattail'

await toDataURL(new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' }))
// return 'data:text/plain;base64,SGVsbG8sIHdvcmxkIQ=='
```

### Arguments

| Arg    | Type   | Defaults |
| ------ | ------ | -------- |
| `file` | `File` |          |

### Return

| Type              |
| ----------------- |
| `Promise<string>` |

## Type declarations

```ts
export function toDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }

    fileReader.readAsDataURL(file)
  })
}
```
