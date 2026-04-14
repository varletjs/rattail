---
category: Object
---

# pick

Pick object properties and construct a new object.

## Documentation

- [English](https://rattail.varletjs.org/object/pick)
- [Chinese docs](https://rattail.varletjs.org/zh/object/pick)

### Usage

```ts
import { pick } from 'rattail'

pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
// return { a: 1, c: 3 }
```

### Arguments

| Arg      | Type       | Defaults |
| -------- | ---------- | -------- |
| `object` | `object`   |          |
| `keys`   | `string[]` |          |

### Return

| Type     |
| -------- |
| `object` |

## Type declarations

```ts
export function pick<T, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (result, key) => {
      result[key] = object[key]
      return result
    },
    {} as Pick<T, K>,
  )
}
```
