---
category: Object
---

# omit

Excludes object properties and constructs a new object.

## Documentation

- [English](https://rattail.varletjs.org/object/omit)
- [Chinese docs](https://rattail.varletjs.org/zh/object/omit)

### Usage

```ts
import { omit } from 'rattail'

omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])
// return { b: 2 }
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
export function omit<T extends object, K extends keyof T>(object: T, keys: K[]): Omit<T, K> {
  const ownKeys = [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]

  return ownKeys.reduce(
    (result, key) => {
      if (!keys.includes(key as K)) {
        result[key as keyof typeof result] = object[key as keyof typeof result]
      }

      return result
    },
    {} as Omit<T, K>,
  )
}
```
