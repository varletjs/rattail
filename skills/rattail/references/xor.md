---
category: Array
---

# xor

XOR(Exclusive OR) the passed array and return a new `array`.

## Documentation

- [English](https://rattail.varletjs.org/array/xor)
- [Chinese docs](https://rattail.varletjs.org/zh/array/xor)

### Usage

```ts
import { xor } from 'rattail'

xor([1, 2, 2], [1, 3])
// return [2, 3]
xor([1, 2], [1, 2], [3])
// return [3]
```

### Arguments

| Arg         | Type           | Defaults |
| ----------- | -------------- | -------- |
| `...values` | `Array<Array>` |          |

### Return

| Type    |
| ------- |
| `Array` |

## Type declarations

```ts
import { xorWith } from './xorWith'

export function xor<T>(...values: T[][]): T[] {
  return xorWith(...values, (a, b) => a === b)
}
```
