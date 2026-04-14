---
category: Util
---

# doubleRaf

Creates a Promise-based double `requestAnimationFrame` that resolves after two frames.

## Documentation

- [English](https://rattail.varletjs.org/util/double-raf)
- [Chinese docs](https://rattail.varletjs.org/zh/util/double-raf)

### Usage

```ts
import { doubleRaf } from 'rattail'

await doubleRaf()
console.log('Two frames later')
```

### Return

| Type            |
| --------------- |
| `Promise<void>` |

## Type declarations

```ts
import { requestAnimationFrame } from './requestAnimationFrame'

export function doubleRaf() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve)
    })
  })
}
```
