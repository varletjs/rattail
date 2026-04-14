---
category: General
---

# hasOwn

Determine whether an `object` has a specific property as its own (not inherited).

## Documentation

- [English](https://rattail.varletjs.org/general/has-own)
- [Chinese docs](https://rattail.varletjs.org/zh/general/has-own)

### Usage

```ts
import { hasOwn } from 'rattail'

const obj = { foo: 123 }
hasOwn(obj, 'foo') // return true
hasOwn(obj, 'bar') // return false
```

### Arguments

| Arg     |   Type   | Defaults |
| ------- | :------: | -------: |
| `value` | `object` |          |
| `key`   | `string` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |

## Type declarations

```ts
const { hasOwnProperty } = Object.prototype

export function hasOwn<T extends object>(val: T, key: PropertyKey): key is keyof T {
  return hasOwnProperty.call(val, key)
}
```
