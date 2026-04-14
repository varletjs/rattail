---
category: General
---

# supportTouch

Determine whether the current environment supports `touch events`.

## Documentation

- [English](https://rattail.varletjs.org/general/support-touch)
- [Chinese docs](https://rattail.varletjs.org/zh/general/support-touch)

### Usage

```ts
import { supportTouch } from 'rattail'

supportTouch() // return true if touch events are supported, false otherwise
```

### Return

|   Type    |
| :-------: |
| `boolean` |

## Type declarations

```ts
import { inBrowser } from './inBrowser'

export function supportTouch() {
  return inBrowser() && 'ontouchstart' in window
}
```
