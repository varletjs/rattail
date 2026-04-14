---
category: Util
---

# getScrollLeft

Gets the horizontal scroll position of an element or window.

## Documentation

- [English](https://rattail.varletjs.org/util/get-scroll-left)
- [Chinese docs](https://rattail.varletjs.org/zh/util/get-scroll-left)

### Usage

```ts
import { getScrollLeft } from 'rattail'

const scrollLeft = getScrollLeft(window)
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
export function getScrollLeft(element: Element | Window) {
  const left = 'scrollLeft' in element ? element.scrollLeft : element.scrollX

  return Math.max(left, 0)
}
```
