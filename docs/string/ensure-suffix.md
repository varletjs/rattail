# ensureSuffix

Ensure that a suffix exists in the `string`, and add it if it does not exist

### Usage

```ts
import { ensureSuffix } from 'rattail'

ensureSuffix('hello-world-suffix', '-suffix') // return 'hello-world-suffix'
ensureSuffix('hello-world', '-suffix') // return 'hello-world-suffix'
```

### Arguments

| Arg      |   Type   | Defaults |
| -------- | :------: | -------: |
| `value`  | `string` |          |
| `suffix` | `string` |          |

### Return

|   Type   |
| :------: |
| `string` |
