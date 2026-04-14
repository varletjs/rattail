---
category: Collection
---

# merge

Merge two objects recursively.

## Documentation

- [English](https://rattail.varletjs.org/collection/merge)
- [Chinese docs](https://rattail.varletjs.org/zh/collection/merge)

### Usage

```ts
import { merge } from 'rattail'

merge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })
// return { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

### Arguments

| Arg          | Type       | Defaults |
| ------------ | ---------- | -------- |
| `object`     | `object`   |          |
| `...sources` | `object[]` |          |

### Return

| Type     |
| -------- |
| `object` |

## Type declarations

```ts
import { mergeWith } from './mergeWith'

export function merge<T extends Record<string, any>, K extends Record<string, any>>(object: T, ...sources: K[]) {
  return mergeWith(object, ...sources, () => undefined)
}
```
