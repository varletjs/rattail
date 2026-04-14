---
category: Util
---

# cancelAnimationFrame

Cancels a `requestAnimationFrame` request using the provided handle, with a fallback to `clearTimeout`.

## Documentation

- [English](https://rattail.varletjs.org/util/cancel-animation-frame)
- [Chinese docs](https://rattail.varletjs.org/zh/util/cancel-animation-frame)

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

## Type declarations

```ts
import { getGlobalThis } from '../general'

export function cancelAnimationFrame(handle: number) {
  const globalThis = getGlobalThis()

  globalThis.cancelAnimationFrame ? globalThis.cancelAnimationFrame(handle) : globalThis.clearTimeout(handle)
}
```
