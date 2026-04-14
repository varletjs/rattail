---
category: Util
---

# getScrollTop

Gets the vertical scroll position of an element or window.

## Documentation

- [English](https://rattail.varletjs.org/util/get-scroll-top)
- [Chinese docs](https://rattail.varletjs.org/zh/util/get-scroll-top)

### Usage

```ts
import { getScrollTop } from 'rattail'

const scrollTop = getScrollTop(window)
```

### Arguments

| Arg       | Type                | Defaults |
| --------- | ------------------- | -------- |
| `element` | `Element \| Window` |          |

### Return

| Type     |
| -------- |
| `number` |

## Type declarations

```ts
export function getScrollTop(element: Element | Window) {
  const top = 'scrollTop' in element ? element.scrollTop : element.scrollY

  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0)
}
```
