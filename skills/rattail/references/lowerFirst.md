---
category: String
---

# lowerFirst

Lowercase the `first letter` of the `string` and keep the rest unchanged.

## Documentation

- [English](https://rattail.varletjs.org/string/lower-first)
- [Chinese docs](https://rattail.varletjs.org/zh/string/lower-first)

### Usage

```ts
import { upperFirst } from 'rattail'

upperFirst('Hello') // return 'hello'
upperFirst('Rattail') // return 'rattail'
```

### Arguments

| Arg     |   Type   | Defaults |
| ------- | :------: | -------: |
| `value` | `string` |          |

### Return

|   Type   |
| :------: |
| `string` |

## Type declarations

```ts
export function lowerFirst(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1)
}
```
