---
category: General
---

# isTypedArray

Determine whether the input value is a `TypedArray`.

## Documentation

- [English](https://rattail.varletjs.org/general/is-typed-array)
- [Chinese docs](https://rattail.varletjs.org/zh/general/is-typed-array)

### Usage

```ts
import { isTypedArray } from 'rattail'

isTypedArray(new Int8Array(8)) // return true
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

export function isTypedArray(
  val: unknown,
): val is
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array {
  return [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array',
  ].includes(toRawType(val))
}
```
