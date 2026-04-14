---
category: Object
---

# objectKeys

Get an array of keys from an object, with full TypeScript type support.

## Documentation

- [English](https://rattail.varletjs.org/object/object-keys)
- [Chinese docs](https://rattail.varletjs.org/zh/object/object-keys)

### Usage

```ts
import { objectKeys } from 'rattail'

const obj = { a: 1, b: 2 }
const keys = objectKeys(obj)
// keys = ['a', 'b']
```

### Arguments

| Arg      | Type     |
| -------- | -------- |
| `object` | `object` |

### Return

| Type            |
| --------------- |
| `Array<string>` |

### Notes

- The return value is fully type-safe for the input object.
- Similar to `Object.keys`, but with better TypeScript support.

## Type declarations

```ts
export function objectKeys<T extends object>(object: T) {
  return Object.keys(object) as Array<`${keyof T & string}`>
}
```
