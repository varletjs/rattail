# ensurePrefix

Ensure that a prefix exists in the `string`, and add it if it does not exist

### Usage

```ts
import { ensurePrefix } from 'rattail'

ensurePrefix('prefix-hello-world', 'prefix-') // return 'prefix-hello-world'
ensurePrefix('hello-world', 'prefix-') // return 'prefix-hello-world'
```

### Arguments

| Arg      |   Type   | Defaults |
| -------- | :------: | -------: |
| `value`  | `string` |          |
| `prefix` | `string` |          |

### Return

|   Type   |
| :------: |
| `string` |
