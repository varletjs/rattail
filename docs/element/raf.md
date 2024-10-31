# raf

Creates a Promise-based `requestAnimationFrame` that resolves on the next frame.

### Usage

```ts
import { raf } from 'rattail'

raf().then(() => {
  console.log('Next animation frame')
})
```

### Return

| Type            |
| --------------- |
| `Promise<void>` |
