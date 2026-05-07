---
category: Object
---

# deriveKey

Derive new object keys by a mapping and construct a new object.

Use this when you want to keep the original keys and add extra derived keys to the result.

## Documentation

- [English](https://rattail.varletjs.org/object/derive-key)
- [Chinese docs](https://rattail.varletjs.org/zh/object/derive-key)

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
