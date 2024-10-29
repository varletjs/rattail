# toggleItem

Adds or removes an item from an `array`, based on its existence in the array.

### Usage

```ts
import { toggleItem } from 'rattail'

const arr = [1, 2]
toggleItem(arr, 2) // arr becomes [1]
toggleItem(arr, 3) // arr becomes [1, 3]
```

### Arguments

| Arg    | Type    | Defaults |
| ------ | ------- | -------- |
| `arr`  | `Array` |          |
| `item` | `any`   |          |

### Return

| Type    |
| ------- |
| `Array` |
