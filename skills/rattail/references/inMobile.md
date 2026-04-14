---
category: General
---

# inMobile

Determine whether the code is running in a `mobile` browser environment.

## Documentation

- [English](https://rattail.varletjs.org/general/in-mobile)
- [Chinese docs](https://rattail.varletjs.org/zh/general/in-mobile)

### Usage

```ts
import { inMobile } from 'rattail'

inMobile() // return true if in mobile browser, false otherwise
```

### Return

|   Type    |
| :-------: |
| `boolean` |

## Type declarations

```ts
import { inBrowser } from './inBrowser'

export function inMobile() {
  return inBrowser() && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
```
