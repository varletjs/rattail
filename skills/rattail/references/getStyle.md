---
category: Util
---

# getStyle

Retrieves computed CSS styles for a given DOM element.

## Documentation

- [English](https://rattail.varletjs.org/util/get-style)
- [Chinese docs](https://rattail.varletjs.org/zh/util/get-style)

### Usage

```ts
import { getStyle } from 'rattail'

const elementStyle = getStyle(document.querySelector('div'))
```

### Arguments

| Arg       | Type      | Defaults |
| --------- | --------- | -------- |
| `element` | `Element` |          |

### Return

| Type                  |
| --------------------- |
| `CSSStyleDeclaration` |

## Type declarations

```ts
export function getStyle(element: Element) {
  return window.getComputedStyle(element)
}
```
