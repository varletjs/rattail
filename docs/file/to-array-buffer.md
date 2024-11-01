# toArrayBuffer

Converts a `File` object to an `ArrayBuffer`.

### Usage

```ts
import { toArrayBuffer } from 'rattail'

const file = new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' })
toArrayBuffer(file).then((arrayBuffer) => {
  console.log(arrayBuffer)
})
```

### Arguments

| Arg    | Type   | Defaults |
| ------ | ------ | -------- |
| `file` | `File` |          |

### Return

| Type                   |
| ---------------------- |
| `Promise<ArrayBuffer>` |
