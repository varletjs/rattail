---
category: Util
---

# inViewport

Determines if an element is visible within the viewport.

## Documentation

- [English](https://rattail.varletjs.org/util/in-viewport)
- [Chinese docs](https://rattail.varletjs.org/zh/util/in-viewport)

### Usage

```ts
import { inViewport } from 'rattail'

const isVisible = inViewport(document.querySelector('div'))
```

### Arguments

| Arg       | Type          | Defaults |
| --------- | ------------- | -------- |
| `element` | `HTMLElement` |          |

### Return

| Type      |
| --------- |
| `boolean` |

## Type declarations

```ts
import { getRect } from './getRect'

export function inViewport(element: HTMLElement) {
  const { top, bottom, left, right } = getRect(element)
  const { width, height } = getRect(window)

  const xInViewport = left <= width && right >= 0
  const yInViewport = top <= height && bottom >= 0

  return xInViewport && yInViewport
}
```
