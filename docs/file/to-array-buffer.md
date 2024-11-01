# toArrayBuffer

Converts a `File` object to an `ArrayBuffer`.

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
