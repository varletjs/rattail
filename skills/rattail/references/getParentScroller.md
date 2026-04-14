---
category: Util
---

# getParentScroller

Finds the closest scrollable ancestor of an element. If no scrollable ancestor is found, returns the `window`.

## Documentation

- [English](https://rattail.varletjs.org/util/get-parent-scroller)
- [Chinese docs](https://rattail.varletjs.org/zh/util/get-parent-scroller)

### Usage

```ts
import { getParentScroller } from 'rattail'

const scroller = getParentScroller(document.querySelector('div'))
```

### Arguments

| Arg  | Type          | Defaults |
| ---- | ------------- | -------- |
| `el` | `HTMLElement` |          |

### Return

| Type                    |
| ----------------------- |
| `HTMLElement \| Window` |

## Type declarations

```ts
import { getStyle } from './getStyle'

export function getParentScroller(el: HTMLElement): HTMLElement | Window {
  let element = el

  while (element) {
    if (!element.parentNode) {
      break
    }

    element = element.parentNode as HTMLElement

    if (element === document.body || element === document.documentElement) {
      break
    }

    const scrollRE = /(scroll|auto)/
    const { overflowY, overflow } = getStyle(element)

    if (scrollRE.test(overflowY) || scrollRE.test(overflow)) {
      return element
    }
  }

  return window
}
```
