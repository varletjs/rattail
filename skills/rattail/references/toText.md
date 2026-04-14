---
category: File
---

# toText

Converts a `File` object to a text string.

## Documentation

- [English](https://rattail.varletjs.org/file/to-text)
- [Chinese docs](https://rattail.varletjs.org/zh/file/to-text)

### Usage

```ts
import { toText } from 'rattail'

await toText(new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' }))
// return 'Hello, world!'
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
export function toText(file: File): Promise<string> {
  return new Promise((resolve) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }

    fileReader.readAsText(file)
  })
}
```
