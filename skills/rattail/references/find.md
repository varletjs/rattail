---
category: Array
---

# find

Finds the `first` or `last` element in an array that meets a specified condition, returning the element and its index.

## Documentation

- [English](https://rattail.varletjs.org/array/find)
- [Chinese docs](https://rattail.varletjs.org/zh/array/find)

### Usage

```ts
import { find } from 'rattail'

find(['a', 'b', 'c'], (item) => item === 'a')
// return ['a', 0]
find(['a', 'b', 'a'], (item) => item === 'a', 'end')
// return ['a', 2]
```

### Arguments

| Arg    | Type                                                  | Defaults  |
| ------ | ----------------------------------------------------- | --------- |
| `arr`  | `Array`                                               |           |
| `fn`   | `(item: any, index: number, array: Array) => boolean` |           |
| `from` | `'start' \| 'end'`                                    | `'start'` |

### Return

| Type                          |
| ----------------------------- |
| `[any, number] \| [null, -1]` |

## Type declarations

```ts
export function find<T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => any,
  from: 'start' | 'end' = 'start',
): [T, number] | [null, -1] {
  let i = from === 'start' ? 0 : arr.length - 1

  while (arr.length > 0 && i >= 0 && i <= arr.length - 1) {
    const flag = fn(arr[i], i, arr)

    if (flag) {
      return [arr[i], i]
    }

    from === 'start' ? i++ : i--
  }

  return [null, -1]
}
```
