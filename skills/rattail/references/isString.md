---
category: General
---

# isString

Determine whether the input value is a `string`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-string)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-string)

### Usage

```ts
import { isString } from 'rattail'

isString('rattail') // return true
isString(123) // return false
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
export function isString(val: unknown): val is string {
  return typeof val === 'string'
}
```
