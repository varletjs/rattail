---
category: Util
---

# requestAnimationFrame

Provides a cross-browser compatible `requestAnimationFrame` function, with a fallback to `setTimeout`.

## Documentation

- [English](https://rattail.varletjs.org/util/request-animation-frame)
- [Chinese docs](https://rattail.varletjs.org/zh/util/request-animation-frame)

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

## Type declarations

```ts
import { getGlobalThis } from '../general'

export function requestAnimationFrame(fn: FrameRequestCallback): number {
  const globalThis = getGlobalThis()

  return globalThis.requestAnimationFrame ? globalThis.requestAnimationFrame(fn) : globalThis.setTimeout(fn)
}
```
