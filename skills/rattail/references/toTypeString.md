---
category: General
---

# toTypeString

Return the `type string` of the input value.

## Documentation

- [English](https://rattail.varletjs.org/general/to-type-string)
- [Chinese docs](https://rattail.varletjs.org/zh/general/to-type-string)

### Usage

```ts
import { toTypeString } from 'rattail'

toTypeString({}) // return '[object Object]'
toTypeString([]) // return '[object Array]'
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type   |
| :------: |
| `string` |

## Type declarations

```ts
export const objectToString: typeof Object.prototype.toString = Object.prototype.toString

export function toTypeString(value: unknown): string {
  return objectToString.call(value)
}
```
