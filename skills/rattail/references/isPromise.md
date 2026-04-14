---
category: General
---

# isPromise

Determine whether the input value is a `Promise`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-promise)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-promise)

### Usage

```ts
import { isPromise } from 'rattail'

isPromise(Promise.resolve()) // return true
isPromise({}) // return false
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
import { isFunction } from './isFunction'
import { isObject } from './isObject'

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
```
