---
category: Array
---

# uniqBy

Creates a duplicate-free version of an `array`, using a custom comparison function to determine uniqueness.

## Documentation

- [English](https://rattail.varletjs.org/array/uniq-by)
- [Chinese docs](https://rattail.varletjs.org/zh/array/uniq-by)

### Usage

```ts
import { uniqBy } from 'rattail'

uniqBy([{ id: 1 }, { id: 2 }, { id: 1 }], (a, b) => a.id === b.id)
// return [{ id: 1 }, { id: 2 }]
```

### Arguments

| Arg   | Type                      | Defaults |
| ----- | ------------------------- | -------- |
| `arr` | `Array`                   |          |
| `fn`  | `(a: any, b: any) => any` |          |

### Return

| Type    |
| ------- |
| `Array` |

## Type declarations

```ts
export function uniqBy<T>(arr: T[], fn: (a: T, b: T) => any): T[] {
  return arr.reduce((ret: T[], i: T) => {
    const index = ret.findIndex((j: T) => fn(i, j))

    if (index === -1) {
      ret.push(i)
    }

    return ret
  }, [])
}
```
