# getParentScroller

Finds the closest scrollable ancestor of an element. If no scrollable ancestor is found, returns the `window`.

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
