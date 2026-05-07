---
category: Object
---

# rekey

Rename object keys by a mapping and construct a new object.

## Documentation

- [English](https://rattail.varletjs.org/object/rekey)
- [Chinese docs](https://rattail.varletjs.org/zh/object/rekey)

### Usage

```ts
import { rekey } from 'rattail'

rekey({ a: 1, b: 2, c: 3 }, { a: 'x', c: 'z' })
// return { x: 1, b: 2, z: 3 }
```

```ts
const id = Symbol('id')
const key = Symbol('key')

rekey(
  {
    [id]: 1,
    name: 'rattail',
  },
  { [id]: key, name: 'label' },
)
// return { [key]: 1, label: 'rattail' }
```

### Arguments

| Arg       | Type     | Defaults |
| --------- | -------- | -------- |
| `object`  | `object` |          |
| `mapping` | `object` |          |

### Return

| Type     |
| -------- |
| `object` |

### Notes

- Returns a new object and does not mutate the original object.
- Keys not present in `mapping` are preserved as-is.
- Supports both string keys and `symbol` keys.
- If multiple source keys map to the same target key, the later key overwrites the earlier one.

## Type declarations

```ts
import { hasOwn } from '../general'

type RekeyMap<T extends object> = Partial<Record<keyof T, PropertyKey>>

type RekeyResult<T extends object, M extends RekeyMap<T>> = Omit<T, keyof M> & {
  [K in keyof M as M[K] extends PropertyKey ? M[K] : never]: K extends keyof T ? T[K] : never
}

export function rekey<T extends object, M extends RekeyMap<T>>(object: T, mapping: M): RekeyResult<T, M> {
  const ownKeys = [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]

  return ownKeys.reduce(
    (result, key) => {
      const nextKey = hasOwn(mapping, key) ? mapping[key] : key
      result[nextKey as keyof typeof result] = object[key as keyof T] as never
      return result
    },
    {} as RekeyResult<T, M>,
  )
}
```
