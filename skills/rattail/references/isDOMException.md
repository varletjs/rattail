---
category: General
---

# isDOMException

Determine whether the input value is a `DOMException` object.

## Documentation

- [English](https://rattail.varletjs.org/general/is-dom-exception)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-dom-exception)

### Usage

```ts
import { isDOMException } from 'rattail'

isDOMException(new DOMException('An error occurred')) // return true
isDOMException(new Error('An error occurred')) // return false
```

### Arguments

| Arg   | Type  | Defaults |
| ----- | :---: | -------: |
| `val` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |

## Type declarations

```ts
import { toRawType } from './toRawType'

export function isDOMException(val: unknown): val is DOMException {
  return toRawType(val) === 'DOMException'
}
```
