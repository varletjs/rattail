---
category: String
---

# genStringKey

Generate a unique `string` key by incrementing a numeric value and converting it to a string.

## Documentation

- [English](https://rattail.varletjs.org/string/gen-string-key)
- [Chinese docs](https://rattail.varletjs.org/zh/string/gen-string-key)

### Usage

```ts
import { genStringKey } from 'rattail'

genStringKey() // return 'generated-key-0'
genStringKey() // return 'generated-key-1'
genStringKey() // return 'generated-key-2'
```

### Return

|   Type   |
| :------: |
| `string` |

## Type declarations

```ts
let key = 0

export function genStringKey() {
  return `generated-key-${key++}`
}
```
