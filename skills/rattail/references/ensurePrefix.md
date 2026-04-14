---
category: String
---

# ensurePrefix

Ensure that a prefix exists in the `string`, and add it if it does not exist

## Documentation

- [English](https://rattail.varletjs.org/string/ensure-prefix)
- [Chinese docs](https://rattail.varletjs.org/zh/string/ensure-prefix)

### Usage

```ts
import { ensurePrefix } from 'rattail'

ensurePrefix('prefix-hello-world', 'prefix-') // return 'prefix-hello-world'
ensurePrefix('hello-world', 'prefix-') // return 'prefix-hello-world'
```

### Arguments

| Arg      |   Type   | Defaults |
| -------- | :------: | -------: |
| `value`  | `string` |          |
| `prefix` | `string` |          |

### Return

|   Type   |
| :------: |
| `string` |

## Type declarations

```ts
export function ensurePrefix(s: string, prefix: string) {
  return s.startsWith(prefix) ? s : prefix + s
}
```
