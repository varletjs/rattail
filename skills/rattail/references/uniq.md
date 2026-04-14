---
category: Array
---

# uniq

Creates a duplicate-free version of an `array`, using the values equality.

## Documentation

- [English](https://rattail.varletjs.org/array/uniq)
- [Chinese docs](https://rattail.varletjs.org/zh/array/uniq)

### Usage

```ts
import { uniq } from 'rattail'

uniq([1, 2, 2, 3]) // return [1, 2, 3]
uniq(['a', 'a', 'b', 'c']) // return ['a', 'b', 'c']
```

### Arguments

| Arg   | Type    | Defaults |
| ----- | ------- | -------- |
| `arr` | `Array` |          |

### Return

| Type    |
| ------- |
| `Array` |

## Type declarations

```ts
export function uniq<T>(arr: T[]) {
  return [...new Set(arr)]
}
```
