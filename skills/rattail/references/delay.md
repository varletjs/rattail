---
category: Number
---

# delay

Create a promise that resolves after a specified time in milliseconds.

## Documentation

- [English](https://rattail.varletjs.org/number/delay)
- [Chinese docs](https://rattail.varletjs.org/zh/number/delay)

### Usage

```ts
import { delay } from 'rattail'

console.log('Start')
await delay(1000)
console.log('End after 1 second')
```

### Arguments

| Arg         |   Type   | Defaults |
| ----------- | :------: | -------: |
| `time (ms)` | `number` |          |

### Return

|      Type       |
| :-------------: |
| `Promise<void>` |

## Type declarations

```ts
export function delay(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, time)
  })
}
```
