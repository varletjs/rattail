---
category: Util
---

# getRect

Gets the dimensions and position of an element or window as a `DOMRect` object.

## Documentation

- [English](https://rattail.varletjs.org/util/get-rect)
- [Chinese docs](https://rattail.varletjs.org/zh/util/get-rect)

### Usage

```ts
import { getRect } from 'rattail'

const rect = getRect(document.querySelector('div'))
```

### Arguments

| Arg       | Type      | Defaults |
| --------- | --------- | -------- |
| `element` | `Element` |          |

### Return

| Type      |
| --------- |
| `DOMRect` |

## Type declarations

```ts
import { isWindow } from '../general'

export function getRect(element: Element | Window): DOMRect {
  if (isWindow(element)) {
    const width = element.innerWidth
    const height = element.innerHeight
    const rect = {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      width,
      height,
    }

    return {
      ...rect,
      toJSON: () => rect,
    }
  }

  return element.getBoundingClientRect()
}
```
