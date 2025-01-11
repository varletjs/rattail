import { describe, expect, it } from 'vitest'
import { cloneDeep, cloneDeepWith, hasOwn, isNumber, merge, mergeWith } from '../src'

it('should merge self', () => {
  const obj = { a: 1 }
  expect(merge(obj)).toBe(obj)
})

it('should merge two objects', () => {
  expect(merge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 })
})

it('should merge rest objects', () => {
  expect(merge({ a: 1 }, { b: 2 }, { c: 3 }, { a: 4 })).toEqual({ a: 4, b: 2, c: 3 })
})

it('should handle nested merges', () => {
  expect(merge({ a: { b: 1 } }, { a: { c: 2 } })).toEqual({ a: { b: 1, c: 2 } })
  expect(merge({ a: 1 }, { b: { c: 1 } })).toEqual({ a: 1, b: { c: 1 } })
  expect(merge({ a: 1 }, { b: { c: 1 } }, { a: 4, b: { d: 1 } })).toEqual({ a: 4, b: { c: 1, d: 1 } })
})

it('should create new properties if they don’t exist in the target', () => {
  const result = merge({ a: 1 }, { b: 2 })
  expect(result).toEqual({ a: 1, b: 2 })
})

it('should handle array merging correctly', () => {
  const result = merge({ a: [1, 2] }, { a: [3, 4] })
  expect(result).toEqual({ a: [3, 4] })
})

it('should use callback for array merging', () => {
  expect(mergeWith({ a: [1, 2] }, { a: [3, 4] }, (objValue, srcValue) => [...objValue, ...srcValue])).toEqual({
    a: [1, 2, 3, 4],
  })

  expect(
    mergeWith({ a: [1, 2] }, { a: [3, 4] }, { b: [5, 6] }, { b: [7, 8], d: [9, 10] }, (objValue, srcValue) => [
      ...(objValue ?? []),
      ...(srcValue ?? []),
    ]),
  ).toEqual({
    a: [1, 2, 3, 4],
    b: [5, 6, 7, 8],
    d: [9, 10],
  })
})

it('should use the callback to override values', () => {
  const result = mergeWith({ a: 1, b: 2 }, { a: 3, b: 4 }, (objValue, srcValue) => objValue + srcValue)
  expect(result).toEqual({ a: 4, b: 6 })
})

describe('cloneDeep', () => {
  it('circular reference', () => {
    const value = { a: 1, self: {} }
    value.self = value
    const result = cloneDeep(value)
    expect(value).toEqual(result)
    expect(value).not.toBe(result)
  })

  it('complex object', () => {
    class Person {
      say() {}
    }

    const value = {
      a: { n: 1 },
      b: [1],
      c: new Date(),
      d: /abc/,
      e: new Set(),
      f: new Map(),
      g: new ArrayBuffer(8),
      h: new DataView(new ArrayBuffer(8)),
      i: new Int8Array(new ArrayBuffer(8)),
      j: new Person(),
    }
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
    expect(value.a).not.toBe(result.a)
    expect(value.b).not.toBe(result.b)
    expect(value.c).not.toBe(result.c)
    expect(value.d).not.toBe(result.d)
    expect(value.e).not.toBe(result.e)
    expect(value.f).not.toBe(result.f)
    expect(value.g).not.toBe(result.g)
    expect(value.h).not.toBe(result.h)
    expect(value.i).not.toBe(result.i)
    expect(value.j).not.toBe(result.j)
  })

  it('nested object', () => {
    const value = { a: { b: { c: 1 } } }
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
    expect(value.a).not.toBe(result.a)
    expect(value.a.b).not.toBe(result.a.b)
  })

  it('nested array objects', () => {
    const value = [{ a: [{ b: 1 }] }]
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
    expect(value[0]).not.toBe(result[0])
    expect(value[0].a).not.toBe(result[0].a)
    expect(value[0].a[0]).not.toBe(result[0].a[0])
  })

  it('Date', () => {
    const value = new Date()
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
  })

  it('RegExp', () => {
    const value = /abc/
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
  })

  it('Map', () => {
    const value = new Map()
    value.set(1, 2)
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
  })

  it('Set', () => {
    const value = new Set()
    value.add(1)
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
  })

  it('String', () => {
    const value = new String('abc')
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
    expect(value.valueOf()).toBe(result.valueOf())
  })

  it('Number', () => {
    const value = new Number(1)
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
    expect(value.valueOf()).toBe(result.valueOf())
  })

  it('Boolean', () => {
    const value = new Boolean(true)
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
    expect(value.valueOf()).toBe(result.valueOf())
  })

  it('Promise', () => {
    const value = Promise.resolve(1)
    const result = cloneDeep(value)
    expect(value).toBe(result)
  })

  it('symbol', () => {
    const value = Symbol('abc')
    const result = cloneDeep(value)
    expect(value).toBe(result)
  })

  it('number', () => {
    const value = 1
    const result = cloneDeep(value)
    expect(value).toBe(result)
  })

  it('string', () => {
    const value = 'abc'
    const result = cloneDeep(value)
    expect(value).toBe(result)
  })

  it('boolean', () => {
    const value = true
    const result = cloneDeep(value)
    expect(value).toBe(result)
  })

  it('null', () => {
    const value = null
    const result = cloneDeep(value)
    expect(value).toBe(result)
  })

  it('undefined', () => {
    const value = undefined
    const result = cloneDeep(value)
    expect(value).toBe(result)
  })

  it('bigInt', () => {
    const value = BigInt(1)
    const result = cloneDeep(value)
    expect(value).toBe(result)
  })

  it('Function', () => {
    const value = () => {}
    const result = cloneDeep(value)
    expect(value).toBe(result)
  })

  it('Array', () => {
    const value = [1, 2, 3]
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
  })

  it('Array of objects', () => {
    const value = [{ a: 1 }, { b: 2 }]
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
    expect(value[0]).not.toBe(result[0])
    expect(value[1]).not.toBe(result[1])
  })

  it('nested Map', () => {
    const value = new Map()
    value.set(1, new Map())
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
    expect(value.get(1)).not.toBe(result.get(1))
  })

  it('nested Set', () => {
    const value = new Set()
    value.add(new Set())
    value.add(1)
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
    const valueIter = value.values()
    const resultIter = result.values()
    expect(valueIter.next().value).not.toBe(resultIter.next().value)
    expect(valueIter.next().value).toBe(resultIter.next().value)
  })

  it('ArrayBuffer', () => {
    const value = new ArrayBuffer(8)
    const result = cloneDeep(value)
    expect(value).toEqual(result)
    expect(value).not.toBe(result)
  })

  it('TypedArray', () => {
    const buffer = new ArrayBuffer(8)
    const value = new Int8Array(buffer)
    const result = cloneDeep(value)
    expect(value).toEqual(result)
    expect(value.buffer).not.toBe(result.buffer)
    expect(value).not.toBe(result)
  })

  it('DataView', () => {
    const buffer = new ArrayBuffer(8)
    const value = new DataView(buffer)
    const result = cloneDeep(value)
    expect(value).toEqual(result)
    expect(value.buffer).not.toBe(result.buffer)
    expect(value).not.toBe(result)
  })

  it('WeakMap', () => {
    const value = new WeakMap()
    value.set({}, 1)
    const result = cloneDeep(value)
    expect(result).toEqual({})
    expect(value).not.toBe(result)
  })

  it('WeakSet', () => {
    const value = new WeakSet()
    value.add({})
    const result = cloneDeep(value)
    expect(result).toEqual({})
    expect(value).not.toBe(result)
  })

  it('Error', () => {
    const value = new Error()
    const result = cloneDeep(value)
    expect(result).toEqual({})
    expect(value).not.toBe(result)
  })

  it('DOMException', () => {
    const value = new DOMException()
    const result = cloneDeep(value)
    expect(result).toEqual({})
    expect(value).not.toBe(result)
  })

  it('class instance (prototype)', () => {
    class Person {
      name = 1

      say() {
        return this.name
      }
    }

    const value = new Person()
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value.say()).toBe(result.say())
    expect(hasOwn(value, 'name')).toBe(true)
    expect(hasOwn(value, 'say')).toBe(false)
    expect(Reflect.getPrototypeOf(value)).toBe(Reflect.getPrototypeOf(result))
  })
})

describe('cloneDeepWith', () => {
  it('with custom function', () => {
    const value = { a: 1, b: 2 }
    const result = cloneDeepWith(value, (v) => {
      if (isNumber(v)) {
        return v + 1
      }
    })

    expect(result).toEqual({ a: 2, b: 3 })
  })
})
