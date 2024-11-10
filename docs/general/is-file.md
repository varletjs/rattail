# isFile

Determine whether the input value is a `File`.

### Usage

```ts
import { isFile } from 'rattail'

isFile(new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' }))
// return true
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
