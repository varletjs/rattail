---
category: Util
---

# preventDefault

Prevents the default action of an event if it is cancelable.

## Documentation

- [English](https://rattail.varletjs.org/util/prevent-default)
- [Chinese docs](https://rattail.varletjs.org/zh/util/prevent-default)

### Usage

```ts
import { preventDefault } from 'rattail'

document.addEventListener('click', preventDefault)
```

### Arguments

| Arg     | Type    | Defaults |
| ------- | ------- | -------- |
| `event` | `Event` |          |

### Return

| Type   |
| ------ |
| `void` |

## Type declarations

```ts
export function preventDefault(event: Event) {
  if (event.cancelable === false) {
    return
  }

  event.preventDefault()
}
```
