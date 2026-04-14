---
category: Function
---

# throttle

Create a throttle function that calls `fn` at most once every `delay` milliseconds.

## Documentation

- [English](https://rattail.varletjs.org/function/throttle)
- [Chinese docs](https://rattail.varletjs.org/zh/function/throttle)

### Usage

```ts
import { throttle } from 'rattail'

const throttledFn = throttle(() => {
  // do something, it will be called at most 1 time per second
}, 1000)

window.addEventListener('resize', throttledFn)
```

### Arguments

| Arg     |    Type    | Defaults |
| ------- | :--------: | -------: |
| `fn`    | `Function` |          |
| `delay` |  `number`  |    `200` |

### Return

|    Type    |
| :--------: |
| `Function` |

## Type declarations

```ts
export function throttle<F extends (...args: any[]) => any>(fn: F, delay = 200) {
  let timer: any
  let start = 0

  return function loop(this: unknown, ...args: Parameters<F>) {
    const now = performance.now()
    const elapsed = now - start

    if (!start) {
      start = now
    }

    if (timer) {
      clearTimeout(timer)
    }

    if (elapsed >= delay) {
      fn.apply(this, args)
      start = now
    } else {
      timer = setTimeout(() => {
        loop.apply(this, args)
      }, delay - elapsed)
    }
  }
}
```
