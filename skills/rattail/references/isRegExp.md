---
category: General
---

# isRegExp

Determine whether the input value is a `RegExp`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-reg-exp)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-reg-exp)

### Usage

```ts
import { isRegExp } from 'rattail'

isRegExp(/abc/) // return true
isRegExp('abc') // return false
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
import { toRawType } from './toRawType'

export function isRegExp(val: unknown): val is RegExp {
  return toRawType(val) === 'RegExp'
}
```
