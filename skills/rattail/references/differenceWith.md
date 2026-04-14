---
category: Array
---

# differenceWith

Creates an `array` of array values ​​that are not contained in other given arrays, and supports custom comparison functions.

## Documentation

- [English](https://rattail.varletjs.org/array/difference-with)
- [Chinese docs](https://rattail.varletjs.org/zh/array/difference-with)

### Usage

```ts
import { differenceWith } from 'rattail'

differenceWith([{ num: 1 }, { num: 2 }, { num: 3 }], [{ num: 2 }], (a, b) => a.num === b.num)
// return [{ num: 1 }, { num: 3 }]
differenceWith([{ num: 1 }, { num: 2 }, { num: 3 }], [{ num: 2 }], [{ num: 3 }], (a, b) => a.num === b.num)
// return [{ num: 1 }]
```

### Arguments

| Arg         | Type                      | Defaults |
| ----------- | ------------------------- | -------- |
| `arr`       | `Array`                   |          |
| `...values` | `Array<Array>`            |          |
| `fn`        | `(a: any, b: any) => any` |          |

### Return

| Type    |
| ------- |
| `Array` |

## Type declarations

```ts
import { at } from './at'

type Fn<T> = (a: T, b: T) => any

export function differenceWith<T>(arr: T[], ...values: [...T[][], fn: Fn<T>]): T[] {
  const fn = at(values, -1) as Fn<T>
  const targets = (values.slice(0, -1) as T[][]).reduce((targets, value) => [...targets, ...value], [])

  return arr.filter((item) => !targets.some((value) => fn(item, value)))
}
```
