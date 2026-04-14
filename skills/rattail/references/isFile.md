---
category: General
---

# isFile

Determine whether the input value is a `File`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-file)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-file)

### Usage

```ts
import { isFile } from 'rattail'

isFile(new File(['Hello, world!'], 'hello.txt', { type: 'text/plain' }))
// return true
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

export function isFile(val: unknown): val is File {
  return toRawType(val) === 'File'
}
```
