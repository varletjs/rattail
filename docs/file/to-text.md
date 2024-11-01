# toText

Converts a `File` object to a text string.

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
