# call

Call a single function or multiple functions (passed as an array) and pass arguments to them.

### Usage

```ts
import { call } from 'rattail'

call((a, b) => a + b, 1, 2)
// return 3
call([(a, b) => a + b, (a, b) => a + b], 1, 2)
// return [3, 3]
```

### Arguments

| Arg       |           Type           | Defaults |
| --------- | :----------------------: | -------: |
| `fn`      | `Function \| Function[]` |          |
| `...args` |         `any[]`          |          |

### Return

|    Type    |
| :--------: |
| `Function` |
