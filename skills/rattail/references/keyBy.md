---
category: Array
---

# keyBy

Creates an `object` keyed by a function's return value, optionally mapping each value.

## Documentation

- [English](https://rattail.varletjs.org/array/key-by)
- [Chinese docs](https://rattail.varletjs.org/zh/array/key-by)

### Usage

```ts
import { keyBy } from 'rattail'

const users = [
  { uuid: 'a', name: 'Alice' },
  { uuid: 'b', name: 'Bob' },
]

keyBy(users, (user) => user.uuid)
// return { a: { uuid: 'a', name: 'Alice' }, b: { uuid: 'b', name: 'Bob' } }
keyBy(
  users,
  (user) => user.uuid,
  (user) => user.name,
)
// return { a: 'Alice', b: 'Bob' }
```

### Arguments

| Arg       | Type                                        | Defaults    |
| --------- | ------------------------------------------- | ----------- |
| `arr`     | `Array`                                     |             |
| `keyFn`   | `(item: any, index: number) => PropertyKey` |             |
| `valueFn` | `(item: any, index: number) => any`         | item itself |

### Return

| Type     |
| -------- |
| `object` |

## Type declarations

```ts
export function keyBy<T, K extends PropertyKey, V = T>(
  arr: readonly T[],
  keyFn: (item: T, index: number) => K,
  valueFn?: (item: T, index: number) => V,
): Record<K, V> {
  return Object.fromEntries(
    arr.map((item, index) => [keyFn(item, index), valueFn ? valueFn(item, index) : item]),
  ) as Record<K, V>
}
```
