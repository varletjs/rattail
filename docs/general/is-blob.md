# isBlob

Determine whether the input value is a `Blob`.

### Usage

```ts
import { isBlob } from 'rattail'

isBlob(new Blob(['Hello, World!'], { type: 'text/plain' })) // return true
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
