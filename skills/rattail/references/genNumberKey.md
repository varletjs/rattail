---
category: Number
---

# genNumberKey

Generate a unique numeric key, `incrementing` with each call.

## Documentation

- [English](https://rattail.varletjs.org/number/gen-number-key)
- [Chinese docs](https://rattail.varletjs.org/zh/number/gen-number-key)

### Usage

```ts
import { genNumberKey } from 'rattail'

genNumberKey() // return 0
genNumberKey() // return 1
genNumberKey() // return 2
```

### Return

|   Type   |
| :------: |
| `number` |

## Type declarations

```ts
let key = 0

export function genNumberKey() {
  return key++
}
```
