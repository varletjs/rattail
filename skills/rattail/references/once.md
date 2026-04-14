---
category: Function
---

# once

Creates a function that will only execute once. Subsequent calls return the result of the first invocation.

## Documentation

- [English](https://rattail.varletjs.org/function/once)
- [Chinese docs](https://rattail.varletjs.org/zh/function/once)

### Usage

```ts
import { once } from 'rattail'

const fn = once(() => 'initialized')
fn() // return 'initialized'
fn() // return 'initialized'
```

### Arguments

| Arg  |    Type    | Defaults |
| ---- | :--------: | -------: |
| `fn` | `Function` |          |

### Return

|    Type    |
| :--------: |
| `Function` |

## Type declarations

```ts
export function once<F extends (...args: any[]) => any>(fn: F) {
  let called = false
  let result: ReturnType<F>

  return function (this: unknown, ...args: Parameters<F>): ReturnType<F> {
    if (called) {
      return result
    }

    called = true
    result = fn.apply(this, args)
    return result
  }
}
```
