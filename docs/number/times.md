# times

Execute a function a specified number of times and return an array of results. Each call to the function is provided with the current index.

### Usage

```ts
import { times } from 'rattail'

times(3, (index) => index * 2)
// returns [0, 2, 4]
times(5, (index) => `Item ${index}`)
// returns ['Item 0', 'Item 1', 'Item 2', 'Item 3', 'Item 4']
```

### Arguments

| Arg   |           Type           | Defaults |
| ----- | :----------------------: | -------: |
| `num` |         `number`         |          |
| `fn`  | `(index: number) => any` |          |

### Return

|  Type   |
| :-----: |
| `Array` |
