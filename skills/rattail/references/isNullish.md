---
category: General
---

# isNullish

Determine whether the input value is `null` or `undefined`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-nullish)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-nullish)

### Usage

```ts
import { isNullish } from 'rattail'

isNullish(null) // return true
isNullish(undefined) // return true
isNullish(123) // return false
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
export function isNullish(val: unknown): val is null | undefined {
  return val == null
}
```
