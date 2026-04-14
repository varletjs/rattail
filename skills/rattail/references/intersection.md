---
category: Array
---

# intersection

Creates an `array` of unique values ​​contained in all given arrays.

## Documentation

- [English](https://rattail.varletjs.org/array/intersection)
- [Chinese docs](https://rattail.varletjs.org/zh/array/intersection)

### Usage

```ts
import { intersection } from 'rattail'

intersection([1, 2, 3, 3], [2, 3, 4])
// return [2, 3]
intersection([1, 2, 3, 3], [2, 3, 4], [3, 4, 5])
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
import { intersectionWith } from './intersectionWith'

export function intersection<T>(...values: T[][]): T[] {
  return intersectionWith(...values, (a, b) => a === b)
}
```
