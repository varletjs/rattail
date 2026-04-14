---
category: Array
---

# difference

Creates an `array` of array values ​​that are not contained in other given arrays.

## Documentation

- [English](https://rattail.varletjs.org/array/difference)
- [Chinese docs](https://rattail.varletjs.org/zh/array/difference)

### Usage

```ts
import { difference } from 'rattail'

difference([1, 2, 3, 4], [2, 3])
// return [1, 4]
difference([1, 2, 3, 4], [2, 3], [3, 4])
// return [1]
```

### Arguments

| Arg         | Type           | Defaults |
| ----------- | -------------- | -------- |
| `arr`       | `Array`        |          |
| `...values` | `Array<Array>` |          |

### Return

| Type    |
| ------- |
| `Array` |

## Type declarations

```ts
import { differenceWith } from './differenceWith'

export function difference<T>(arr: T[], ...values: T[][]): T[] {
  return differenceWith(arr, ...values, (a, b) => a === b)
}
```
