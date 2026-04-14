---
category: Array
---

# groupBy

Group the elements in a given `array`, and the return value of the passed function will be used as the key of the group.

## Documentation

- [English](https://rattail.varletjs.org/array/group-by)
- [Chinese docs](https://rattail.varletjs.org/zh/array/group-by)

### Usage

```ts
import { groupBy } from 'rattail'

groupBy([1, 2, 3, 4, 5], (num) => (num % 2 === 0 ? 'even' : 'odd'))
// return { odd: [1, 3, 5], even: [2, 4] }
groupBy(
  [
    { name: 'a', gender: 'female' },
    { name: 'b', gender: 'female' },
    { name: 'c', gender: 'male' },
  ],
  (val) => val.gender,
)
// return {
//   female: [
//     { name: 'a', gender: 'female' },
//     { name: 'b', gender: 'female' },
//   ],
//   male: [{ name: 'c', gender: 'male' }],
// }
```

### Arguments

| Arg   | Type                | Defaults |
| ----- | ------------------- | -------- |
| `arr` | `Array`             |          |
| `fn`  | `(val: any) => any` |          |

### Return

| Type     |
| -------- |
| `object` |

## Type declarations

```ts
type Fn<T, K> = (val: T) => K

export function groupBy<T, K extends PropertyKey>(arr: T[], fn: Fn<T, K>): Record<K, T[]> {
  return arr.reduce(
    (result, item) => {
      const key = fn(item)
      ;(result[key] ??= []).push(item)
      return result
    },
    {} as Record<K, T[]>,
  )
}
```
