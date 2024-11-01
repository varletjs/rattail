# requestAnimationFrame

Provides a cross-browser compatible `requestAnimationFrame` function, with a fallback to `setTimeout`.

### Usage

```ts
import { requestAnimationFrame } from 'rattail'

requestAnimationFrame(() => {
  console.log('Frame requested')
})
```

### Arguments

| Arg  | Type                   | Defaults |
| ---- | ---------------------- | -------- |
| `fn` | `FrameRequestCallback` |          |

### Return

| Type     |
| -------- |
| `number` |
