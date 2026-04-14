---
category: Array
---

# xorWith

XOR(Exclusive OR) the passed array and return a new `array`, and supports custom comparison functions.

## Documentation

- [English](https://rattail.varletjs.org/array/xor-with)
- [Chinese docs](https://rattail.varletjs.org/zh/array/xor-with)

### Usage

```ts
import { xorWith } from 'rattail'

xorWith([{ num: 1 }, { num: 2 }, { num: 2 }], [{ num: 1 }, { num: 3 }], (a, b) => a.num === b.num)
// return [{ num: 2 }, { num: 3 }]
xorWith([{ num: 1 }, { num: 2 }], [{ num: 1 }, { num: 2 }], [{ num: 3 }], (a, b) => a.num === b.num)
// return [{ num: 3 }]
```

### Arguments

| Arg         | Type                      | Defaults |
| ----------- | ------------------------- | -------- |
| `...values` | `Array<Array>`            |          |
| `fn`        | `(a: any, b: any) => any` |          |

### Return

| Type    |
| ------- |
| `Array` |

## Type declarations

```ts
import { at } from './at'
import { differenceWith } from './differenceWith'
import { uniqBy } from './uniqBy'

type Fn<T> = (a: T, b: T) => any

export function xorWith<T>(...values: [...T[][], fn: Fn<T>]): T[] {
  const fn = at(values, -1) as Fn<T>
  const targets = values.slice(0, -1) as T[][]

  return uniqBy(
    targets.reduce((result, target) => {
      return [...differenceWith(result, target, fn), ...differenceWith(target, result, fn)]
    }),
    fn,
  )
}
```
