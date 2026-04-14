---
category: Function
---

# debounce

Create a `debounce` function that delays the execution of the fn method by `delay` milliseconds after the last call.

## Documentation

- [English](https://rattail.varletjs.org/function/debounce)
- [Chinese docs](https://rattail.varletjs.org/zh/function/debounce)

### Usage

```ts
import { debounce } from 'rattail'

const debouncedFn = debounce(() => {
  // do something
}, 1000)

window.addEventListener('resize', debouncedFn)
```

### Arguments

| Arg     |    Type    | Defaults |
| ------- | :--------: | -------: |
| `fn`    | `Function` |          |
| `delay` |  `number`  |      `0` |

### Return

|    Type    |
| :--------: |
| `Function` |

## Type declarations

```ts
export function debounce<F extends (...args: any[]) => any>(fn: F, delay = 0) {
  let timer: any

  return function (this: unknown, ...args: Parameters<F>) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```
