---
category: Array
---

# removeArrayBlank

Removes `null` or `undefined` values from an `array`.

## Documentation

- [English](https://rattail.varletjs.org/array/remove-array-blank)
- [Chinese docs](https://rattail.varletjs.org/zh/array/remove-array-blank)

### Usage

```ts
import { removeArrayBlank } from 'rattail'

removeArrayBlank([1, null, 2, undefined, 3]) // return [1, 2, 3]
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
export function removeArrayBlank<T>(arr: (T | null | undefined)[]) {
  return arr.filter((item) => item != null) as T[]
}
```
