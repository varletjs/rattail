---
category: Object
---

# objectEntries

Get an array of key-value pairs from an object, with full TypeScript type support.

## Documentation

- [English](https://rattail.varletjs.org/object/object-entries)
- [Chinese docs](https://rattail.varletjs.org/zh/object/object-entries)

### Usage

```ts
import { objectEntries } from 'rattail'

const obj = { a: 1, b: 2 }
const entries = objectEntries(obj)
// entries = [['a', 1], ['b', 2]]
```

### Arguments

| Arg      | Type     |
| -------- | -------- |
| `object` | `object` |

### Return

| Type                   |
| ---------------------- |
| `Array<[string, any]>` |

### Notes

- The return value is fully type-safe for the input object.
- Similar to `Object.entries`, but with better TypeScript support.

## Type declarations

```ts
export function objectEntries<T extends object>(object: T) {
  return Object.entries(object) as Array<[keyof T & string, T[keyof T & string]]>
}
```
