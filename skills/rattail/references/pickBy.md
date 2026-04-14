---
category: Object
---

# pickBy

By providing a function to extract object properties and construct a new object, returning a `truthy` value indicates that the property needs to be extracted.

## Documentation

- [English](https://rattail.varletjs.org/object/pick-by)
- [Chinese docs](https://rattail.varletjs.org/zh/object/pick-by)

### Usage

```ts
import { pickBy } from 'rattail'

pickBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
// return { b: 2, c: 3 }
pickBy({ a: 1, b: 2, c: 3 }, (value, key) => key !== 'a')
// return { b: 2, c: 3 }
```

### Arguments

| Arg      | Type                               | Defaults |
| -------- | ---------------------------------- | -------- |
| `object` | `object`                           |          |
| `fn`     | `(value: any, key: string) => any` |          |

### Return

| Type     |
| -------- |
| `object` |

## Type declarations

```ts
export function pickBy<T extends object>(object: T, fn: (value: any, key: keyof T) => any): Partial<T> {
  const ownKeys = [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]

  return ownKeys.reduce((result, key) => {
    const value = object[key as keyof typeof object]

    if (fn(value, key as keyof T)) {
      result[key as keyof typeof result] = value
    }

    return result
  }, {} as Partial<T>)
}
```
