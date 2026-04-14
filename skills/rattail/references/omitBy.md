---
category: Object
---

# omitBy

Excludes an object property by providing a function that constructs a new object. Returns a `truthy` value to indicate that the property should be excluded.

## Documentation

- [English](https://rattail.varletjs.org/object/omit-by)
- [Chinese docs](https://rattail.varletjs.org/zh/object/omit-by)

### Usage

```ts
import { omitBy } from 'rattail'

omitBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)
// return { a: 1 }
omitBy({ a: 1, b: 2, c: 3 }, (value, key) => key !== 'a')
// return { a: 1 }
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
export function omitBy<T extends object>(object: T, fn: (value: any, key: keyof T) => any): Partial<T> {
  const ownKeys = [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]

  return ownKeys.reduce((result, key) => {
    const value = object[key as keyof typeof object]

    if (!fn(value, key as keyof T)) {
      result[key as keyof typeof result] = value
    }

    return result
  }, {} as Partial<T>)
}
```
