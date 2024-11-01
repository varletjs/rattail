# cancelAnimationFrame

Cancels a `requestAnimationFrame` request using the provided handle, with a fallback to `clearTimeout`.

### Usage

```ts
import { cancelAnimationFrame } from 'rattail'

const handle = requestAnimationFrame(() => {})
cancelAnimationFrame(handle)
```

### Arguments

| Arg      | Type     | Defaults |
| -------- | -------- | -------- |
| `handle` | `number` |          |

### Return

| Type   |
| ------ |
| `void` |
