# getRect

Gets the dimensions and position of an element or window as a `DOMRect` object.

### Usage

```ts
import { getRect } from 'rattail'

const rect = getRect(document.querySelector('div'))
```

### Arguments

| Arg       | Type      | Defaults |
| --------- | --------- | -------- |
| `element` | `Element` | `Window` |

### Return

| Type      |
| --------- |
| `DOMRect` |
