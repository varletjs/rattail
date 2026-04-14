---
category: General
---

# isDataView

Determine whether the input value is a `DataView`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-data-view)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-data-view)

### Usage

```ts
import { isDataView } from 'rattail'

isDataView(new DataView(new ArrayBuffer(1))) // return true
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
import { toRawType } from './toRawType'

export function isDataView(val: unknown): val is DataView {
  return toRawType(val) === 'DataView'
}
```
