---
category: Object
---

# mapObject

Maps an object into a new object.

## Documentation

- [English](https://rattail.varletjs.org/object/map-object)
- [Chinese docs](https://rattail.varletjs.org/zh/object/map-object)

### Usage

```ts
import { mapObject } from 'rattail'

mapObject({ a: 1, b: 2 }, (key, value) => [key, value * 2])
// return { a: 2, b: 4 }
mapObject({ a: 1, b: 2 }, (key, value) => [`${key}${value}`, value])
// return { a1: 1, b2: 2 }
mapObject({ a: 1, b: 2 }, (key, value) => (value === 1 ? [key, value] : undefined))
// return { a: 1 }
```

### Arguments

| Arg      | Type                                                                  | Defaults |
| -------- | --------------------------------------------------------------------- | -------- |
| `object` | `object`                                                              |          |
| `fn`     | `(key: string, value: any) => [key: string, value: any] \| undefined` |          |

### Return

| Type     |
| -------- |
| `object` |

## Type declarations

```ts
import { isArray } from '../general'

export function mapObject<K extends PropertyKey, V, NK extends PropertyKey = K, NV = V>(
  object: Record<K, V>,
  fn: (key: K, value: V) => [PropertyKey, NV] | undefined,
): Record<NK, NV> {
  return Object.entries(object).reduce(
    (result, [key, value]) => {
      const entry = fn(key as K, value as V)

      if (isArray(entry)) {
        const [newKey, newValue] = entry
        result[newKey as NK] = newValue
      }

      return result
    },
    {} as Record<NK, NV>,
  )
}
```
