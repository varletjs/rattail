---
category: String
---

# upperFirst

Capitalize the `first letter` of a `string`, leaving the rest of the string unchanged.

## Documentation

- [English](https://rattail.varletjs.org/string/upper-first)
- [Chinese docs](https://rattail.varletjs.org/zh/string/upper-first)

### Usage

```ts
import { upperFirst } from 'rattail'

upperFirst('hello world') // return 'Hello world'
upperFirst('rattail') // return 'Rattail'
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
export function upperFirst(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
```
