---
category: Function
---

# tryCall

Safely call a function and return an `[error, result]` tuple. If the function throws, the error is captured in the first element; otherwise the result is in the second element.

## Documentation

- [English](https://rattail.varletjs.org/function/try-call)
- [Chinese docs](https://rattail.varletjs.org/zh/function/try-call)

### Usage

```ts
import { tryCall } from 'rattail'

const [err, result] = tryCall(JSON.parse, '{"a":1}')
// err = undefined, result = { a: 1 }

const [err2, result2] = tryCall(JSON.parse, 'invalid')
// err2 = SyntaxError, result2 = undefined
```

### Arguments

| Arg       |          Type          | Defaults |
| --------- | :--------------------: | -------: |
| `fn`      | `(...args: Args) => T` |          |
| `...args` |         `Args`         |          |

### Return

|                   Type                   |
| :--------------------------------------: |
| `[unknown, undefined] \| [undefined, T]` |

## Type declarations

```ts
export function tryCall<Args extends any[], T>(
  fn: (...args: Args) => T,
  ...args: Args
): [unknown, undefined] | [undefined, T]
```
