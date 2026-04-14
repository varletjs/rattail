---
category: Collection
---

# cloneDeepWith

Create a deep clone of a value, applying a custom function for cloning on each value. The function will process objects with various types.

## Documentation

- [English](https://rattail.varletjs.org/collection/clone-deep-with)
- [Chinese docs](https://rattail.varletjs.org/zh/collection/clone-deep-with)

### Usage

```ts
import { cloneDeepWith, isNumber } from 'rattail'

const original = { a: 1, b: { c: 2 } }
const value = cloneDeepWith(original, (val) => {
  if (isNumber(val)) {
    return val * 2
  }
})
// value is { a: 2, b: { c: 4 } }
```

### Arguments

| Arg     |         Type          | Defaults |
| ------- | :-------------------: | -------: |
| `value` |         `any`         |          |
| `fn`    | `(value: any) => any` |          |

### Return

| Type  |
| :---: |
| `any` |

## Type declarations

```ts
import {
  isArray,
  isArrayBuffer,
  isDataView,
  isDate,
  isDOMException,
  isError,
  isMap,
  isObject,
  isPlainObject,
  isRegExp,
  isSet,
  isTypedArray,
  isWeakMap,
  isWeakSet,
  toRawType,
} from '../general'

export function cloneDeepWith<T>(value: T, fn: (value: any) => any): T {
  const cache = new WeakMap()

  function baseCloneDeep(value: any, cache: WeakMap<any, any>): any {
    const customResult = fn(value)

    if (customResult !== undefined) {
      return customResult
    }

    if (!isObject(value)) {
      return value
    }

    if (cache.has(value)) {
      return cache.get(value)
    }

    if (isDate(value)) {
      return new Date(value)
    }

    if (isRegExp(value)) {
      return new RegExp(value)
    }

    if (isMap(value)) {
      const result = new Map()
      cache.set(value, result)

      value.forEach((val: any, key: any) => {
        result.set(baseCloneDeep(key, cache), baseCloneDeep(val, cache))
      })

      return result
    }

    if (isSet(value)) {
      const result = new Set()
      cache.set(value, result)

      value.forEach((val: any) => {
        result.add(baseCloneDeep(val, cache))
      })

      return result
    }

    if (toRawType(value) === 'String' || toRawType(value) === 'Number' || toRawType(value) === 'Boolean') {
      return newConstructor(value, value.valueOf())
    }

    if (isWeakMap(value) || isWeakSet(value) || isError(value) || isDOMException(value)) {
      return {}
    }

    if (isTypedArray(value)) {
      return newConstructor(value, baseCloneArrayBuffer(value.buffer as ArrayBuffer), value.byteOffset, value.length)
    }

    if (isDataView(value)) {
      return newConstructor(
        value,
        baseCloneArrayBuffer(value.buffer as ArrayBuffer),
        value.byteOffset,
        value.byteLength,
      )
    }

    if (isArrayBuffer(value)) {
      return baseCloneArrayBuffer(value)
    }

    if (isArray(value)) {
      const result: any[] = []
      cache.set(value, result)

      value.forEach((value, index) => {
        result[index] = baseCloneDeep(value, cache)
      })

      return result
    }

    if (isPlainObject(value)) {
      const result: Record<string | symbol, any> = Object.create(Reflect.getPrototypeOf(value))
      cache.set(value, result)

      const ownKeys = [...Object.keys(value), ...Object.getOwnPropertySymbols(value)]
      ownKeys.forEach((key) => {
        result[key] = baseCloneDeep(value[key as keyof typeof value], cache)
      })

      return result
    }

    return value
  }

  function baseCloneArrayBuffer(value: ArrayBuffer): ArrayBuffer {
    const result = new ArrayBuffer(value.byteLength)
    new Uint8Array(result).set(new Uint8Array(value))
    return result
  }

  function newConstructor(value: any, ...args: any[]) {
    return new value.constructor(...args)
  }

  return baseCloneDeep(value, cache)
}
```
