# getAllParentScroller

Retrieves all scrollable ancestor elements of an element in an array, including the `window` as the last item.

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
