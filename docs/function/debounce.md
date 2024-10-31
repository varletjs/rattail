# debounce

Create a `debounce` function that delays the execution of the fn method by `delay` milliseconds after the last call.

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
| `delay` |  `number`  |        0 |

### Return

|    Type    |
| :--------: |
| `Function` |
