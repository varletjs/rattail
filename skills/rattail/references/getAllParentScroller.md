---
category: Util
---

# getAllParentScroller

Retrieves all scrollable ancestor elements of an element in an array, including the `window` as the last item.

## Documentation

- [English](https://rattail.varletjs.org/util/get-all-parent-scroller)
- [Chinese docs](https://rattail.varletjs.org/zh/util/get-all-parent-scroller)

### Usage

```ts
import { getAllParentScroller } from 'rattail'

const scrollers = getAllParentScroller(document.querySelector('div'))
```

### Arguments

| Arg  | Type          | Defaults |
| ---- | ------------- | -------- |
| `el` | `HTMLElement` |          |

### Return

| Type                           |
| ------------------------------ |
| `Array<HTMLElement \| Window>` |

## Type declarations

```ts
import { isWindow } from '../general'
import { getParentScroller } from './getParentScroller'

export function getAllParentScroller(el: HTMLElement): (HTMLElement | Window)[] {
  const allParentScroller: (HTMLElement | Window)[] = []
  let element: HTMLElement | Window = el

  while (!isWindow(element)) {
    element = getParentScroller(element)
    allParentScroller.push(element)
  }

  return allParentScroller
}
```
