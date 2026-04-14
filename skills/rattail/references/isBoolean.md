---
category: General
---

# isBoolean

Determine whether the input value is a `boolean`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-boolean)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-boolean)

### Usage

```ts
import { isBoolean } from 'rattail'

isBoolean(true) // return true
isBoolean('rattail') // return false
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |

## Type declarations

```ts
export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean'
}
```
