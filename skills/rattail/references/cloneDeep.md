---
category: Collection
---

# cloneDeep

Create a deep clone of a value.

## Documentation

- [English](https://rattail.varletjs.org/collection/clone-deep)
- [Chinese docs](https://rattail.varletjs.org/zh/collection/clone-deep)

### Usage

```ts
import { cloneDeep } from 'rattail'

const original = { a: 1, b: { c: 2 } }
const value = cloneDeep(original)
// value is { a: 1, b: { c: 2 } }
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

| Type  |
| :---: |
| `any` |

## Type declarations

```ts
import { cloneDeepWith } from './cloneDeepWith'

export function cloneDeep<T>(value: T): T {
  return cloneDeepWith(value, () => undefined)
}
```
