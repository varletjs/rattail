---
category: Object
---

# set

Set a value at a given path in an object, creating nested objects or arrays as needed.

## Documentation

- [English](https://rattail.varletjs.org/object/set)
- [Chinese docs](https://rattail.varletjs.org/zh/object/set)

### Usage

```ts
import { set } from 'rattail'

const obj = {}
set(obj, ['a', 'b', 'c'], 123)
// obj = { a: { b: { c: 123 } } }

set(obj, ['x', 0, 'y'], 'hello')
// obj = { a: { b: { c: 123 } }, x: [ { y: 'hello' } ] }
```

### Arguments

| Arg      | Type                      | Defaults |
| -------- | ------------------------- | -------- |
| `object` | `object`                  | `any[]`  |
| `path`   | `Array<string \| number>` |
| `value`  | `any`                     |          |

### Return

| Type   |
| ------ |
| `void` |

## Type declarations

```ts
import { isNumber, isObject } from '../general'

export function set<T extends object | any[]>(object: T, path: (string | number)[], value: any) {
  if (!isObject(object)) {
    return
  }

  const keys = [...path]

  if (keys.length === 0) {
    return
  }

  let target = object as any

  while (keys.length > 1) {
    const key = keys.shift() as string | number
    const nextKey = keys[0]

    if (!isObject(target[key])) {
      target[key] = isNumber(nextKey) ? [] : {}
    }

    target = target[key]
  }

  target[keys[0]] = value
}
```
