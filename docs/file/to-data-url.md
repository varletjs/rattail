# toDataURL

Converts a `File` object to a Data URL string.

### Usage

```ts
import { toDataURL } from 'rattail'

const file = new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' })
toDataURL(file).then((dataUrl) => {
  console.log(dataUrl)
})
```

### Arguments

| Arg    | Type   | Defaults |
| ------ | ------ | -------- |
| `file` | `File` |          |

### Return

| Type              |
| ----------------- |
| `Promise<string>` |
