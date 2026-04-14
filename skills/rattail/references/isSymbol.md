---
category: General
---

# isSymbol

Determine whether the input value is a `symbol`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-symbol)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-symbol)

### Usage

```ts
import { isSymbol } from 'rattail'

isSymbol(Symbol('test')) // return true
isSymbol('rattail') // return false
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
export function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol'
}
```
