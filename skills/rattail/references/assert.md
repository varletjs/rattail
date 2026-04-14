---
category: General
---

# assert

Throws an error when the input value is not `true`, the second argument is the error message.

## Documentation

- [English](https://rattail.varletjs.org/general/assert)
- [Chinese docs](https://rattail.varletjs.org/zh/general/assert)

### Usage

```ts
import { assert } from 'rattail'

const count = 99
assert(count < 100, 'error message')
```

### Arguments

| Arg         |   Type    | Defaults |
| ----------- | :-------: | -------: |
| `condition` | `boolean` |          |
| `message`   | `string`  |          |

## Type declarations

```ts
export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}
```
