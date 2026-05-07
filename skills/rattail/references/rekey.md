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
