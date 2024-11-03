# copyText

Copies text to the clipboard.

### Usage

```js
import { copyText } from 'rattail'

copyText('Hello, clipboard!') // return undefined
copyText('') // outputs a warning and return { success: false }
```

### Arguments

| Arg    | Type     | Defaults |
| ------ | -------- | -------- |
| `text` | `string` |          |

### Return

| Type                                                 |
| ---------------------------------------------------- |
| `{ success: boolean; error?: Error; } \|  undefined` |
