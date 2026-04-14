---
category: Function
---

# call

Call a single function or multiple functions (passed as an array) and pass arguments to them.

## Documentation

- [English](https://rattail.varletjs.org/function/call)
- [Chinese docs](https://rattail.varletjs.org/zh/function/call)

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

## Type declarations

```ts
import { isArray } from '../general'

export function call<P extends any[], R>(
  fn?: ((...arg: P) => R) | ((...arg: P) => R)[] | null,
  ...args: P
): R | R[] | undefined {
  if (isArray(fn)) {
    return fn.map((f) => f(...args))
  }

  if (fn) {
    return fn(...args)
  }
}
```
