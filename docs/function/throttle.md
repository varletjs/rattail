# throttle

Create a throttle function that calls `fn` at most once every `delay` milliseconds.

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
