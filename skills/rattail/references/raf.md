---
category: Util
---

# raf

Creates a Promise-based `requestAnimationFrame` that resolves on the next frame.

## Documentation

- [English](https://rattail.varletjs.org/util/raf)
- [Chinese docs](https://rattail.varletjs.org/zh/util/raf)

### Usage

```ts
import { raf } from 'rattail'

await raf()
console.log('Next animation frame')
```

### Return

| Type            |
| --------------- |
| `Promise<void>` |

## Type declarations

```ts
import { requestAnimationFrame } from './requestAnimationFrame'

export function raf() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve)
  })
}
```
