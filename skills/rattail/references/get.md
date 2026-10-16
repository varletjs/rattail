---
category: Object
---

# get

Get the value at a given path of an object. Returns `defaultValue` when the resolved value is `undefined`.

The path can be an array of keys, or a string with dot and bracket notation such as `a.b[0].c` or `a["b.c"]`. Empty segments in a string path are ignored. A string path that is an own key of the object is used as a single key.

## Documentation

- [English](https://rattail.varletjs.org/object/get)
- [Chinese docs](https://rattail.varletjs.org/zh/object/get)

### Usage

```ts
import { get } from 'rattail'

const obj = { a: { b: [{ c: 1 }] }, 'x.y': 2 }

get(obj, 'a.b[0].c')
// 1
get(obj, ['a', 'b', 0, 'c'])
// 1
get(obj, 'x.y')
// 2
get(obj, 'a.d', 'default')
// 'default'
```

### Arguments

| Arg            | Type                                          | Defaults |
| -------------- | --------------------------------------------- | -------- |
| `object`       | `any`                                         |          |
| `path`         | `string \| number \| Array<string \| number>` |          |
| `defaultValue` | `T`                                           |          |

### Return

| Type |
| ---- |
| `T`  |

## Type declarations

```ts
import { hasOwn, isArray, isString } from '../general'

export function get<T = any>(object: any, path: string | number | (string | number)[], defaultValue?: T): T {
  const keys = toKeys(object, path)

  if (keys.length === 0) {
    return defaultValue as T
  }

  let value = object

  for (const key of keys) {
    if (value == null) {
      return defaultValue as T
    }

    value = value[key]
  }

  return value === undefined ? (defaultValue as T) : value
}

function toKeys(object: any, path: string | number | (string | number)[]) {
  if (isString(path)) {
    return object != null && hasOwn(Object(object), path) ? [path] : parsePath(path)
  }

  if (isArray(path)) {
    return path
  }

  return path == null ? [] : [path]
}

function parsePath(path: string) {
  return Array.from(
    path.matchAll(/[^.[\]]+|\[(?:(["'])(.*?)\1|([^\]]*))\]/g),
    ([match, quote, quotedKey, bracketKey]) => (quote ? quotedKey : (bracketKey ?? match)),
  )
}
```
