# deriveKey

Derive new object keys by a mapping and construct a new object.

Use this when you want to keep the original keys and add extra derived keys to the result.

### Usage

```ts
import { deriveKey } from 'rattail'

deriveKey({ value: 1, label: 'Option A' }, { label: 'tooltip' })
// return { value: 1, label: 'Option A', tooltip: 'Option A' }
```

```ts
const options = [{ value: 'a', label: 'Option A' }]

options.map((option) => deriveKey(option, { label: 'tooltip' }))
// return [{ value: 'a', label: 'Option A', tooltip: 'Option A' }]
```

```ts
const id = Symbol('id')
const key = Symbol('key')

deriveKey(
  {
    [id]: 1,
    name: 'rattail',
  },
  { [id]: key, name: 'label' },
)
// return { [id]: 1, [key]: 1, name: 'rattail', label: 'rattail' }
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
- If a derived target key already exists, the derived value overwrites it.
- Unlike `rekey`, `deriveKey` keeps the original key and adds a new key.

### Type declarations

```ts
import { hasOwn } from '../general'

type DeriveKeyMap<T extends object> = Partial<Record<keyof T, PropertyKey>>

type DeriveKeyResult<T extends object, M extends DeriveKeyMap<T>> = T & {
  [K in keyof M as M[K] extends PropertyKey ? M[K] : never]: K extends keyof T ? T[K] : never
}

export function deriveKey<T extends object, M extends DeriveKeyMap<T>>(object: T, mapping: M): DeriveKeyResult<T, M> {
  const ownKeys = [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]
  const result = ownKeys.reduce(
    (result, key) => {
      result[key as keyof typeof result] = object[key as keyof T] as never
      return result
    },
    {} as DeriveKeyResult<T, M>,
  )

  const mappingKeys = [...Object.keys(mapping), ...Object.getOwnPropertySymbols(mapping)]

  mappingKeys.forEach((key) => {
    if (!hasOwn(object, key)) {
      return
    }

    const nextKey = mapping[key as keyof M]
    result[nextKey as keyof typeof result] = object[key as keyof T] as never
  })

  return result
}
```
