---
category: Array
---

# removeArrayEmpty

Removes `null`, `undefined`, or empty string (`''`) values from an `array`.

## Documentation

- [English](https://rattail.varletjs.org/array/remove-array-empty)
- [Chinese docs](https://rattail.varletjs.org/zh/array/remove-array-empty)

### Usage

```ts
import { removeArrayEmpty } from 'rattail'

removeArrayEmpty([1, null, undefined, '', 3]) // return [1, 3]
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
export function removeArrayEmpty<T>(arr: (T | null | undefined | '')[]) {
  return arr.filter((item) => item != null && item !== '') as T[]
}
```
