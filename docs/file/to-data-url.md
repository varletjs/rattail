# toDataURL

Converts a `File` object to a Data URL string.

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
