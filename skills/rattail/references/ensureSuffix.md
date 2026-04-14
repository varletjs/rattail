---
category: String
---

# ensureSuffix

Ensure that a suffix exists in the `string`, and add it if it does not exist

## Documentation

- [English](https://rattail.varletjs.org/string/ensure-suffix)
- [Chinese docs](https://rattail.varletjs.org/zh/string/ensure-suffix)

### Usage

```ts
import { ensureSuffix } from 'rattail'

ensureSuffix('hello-world-suffix', '-suffix') // return 'hello-world-suffix'
ensureSuffix('hello-world', '-suffix') // return 'hello-world-suffix'
```

### Arguments

| Arg      |   Type   | Defaults |
| -------- | :------: | -------: |
| `value`  | `string` |          |
| `suffix` | `string` |          |

### Return

|   Type   |
| :------: |
| `string` |

## Type declarations

```ts
export function ensureSuffix(s: string, suffix: string) {
  return s.endsWith(suffix) ? s : s + suffix
}
```
