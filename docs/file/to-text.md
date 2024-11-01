# toText

Converts a `File` object to a text string.

### Usage

```ts
import { toText } from 'rattail'

const file = new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' })
toText(file).then((text) => {
  console.log(text)
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
