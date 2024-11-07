import { describe, it, expect } from 'vitest'
import { merge, mergeWith, cloneDeep, cloneDeepWith, isNumber, hasOwn, pick, omit, pickBy, omitBy } from '../src'

it('should merge two objects', () => {
  const result = merge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 })
  expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 })
})

it('should handle nested merges', () => {
  const result = merge({ a: { b: 1 } }, { a: { c: 2 } })
  expect(result).toEqual({ a: { b: 1, c: 2 } })

  const result2 = merge({ a: 1 }, { b: { c: 1 } })
  expect(result2).toEqual({ a: 1, b: { c: 1 } })
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
  const result = mergeWith({ a: [1, 2] }, { a: [3, 4] }, (objValue, srcValue) => [...objValue, ...srcValue])
  expect(result).toEqual({ a: [1, 2, 3, 4] })
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
    // eslint-disable-next-line no-new-wrappers
    const value = new String('abc')
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
    expect(value.valueOf()).toBe(result.valueOf())
  })

  it('Number', () => {
    // eslint-disable-next-line no-new-wrappers
    const value = new Number(1)
    const result = cloneDeep(value)

    expect(value).toEqual(result)
    expect(value).not.toBe(result)
    expect(value.valueOf()).toBe(result.valueOf())
  })

  it('Boolean', () => {
    // eslint-disable-next-line no-new-wrappers
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

describe('pick', () => {
  it('should pick specified string keys from an object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = pick(obj, ['a', 'c'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should pick specified symbol keys from an object', () => {
    const symA = Symbol('a')
    const symB = Symbol('b')
    const obj = {
      [symA]: 'valueA',
      [symB]: 'valueB',
      c: 3,
    }

    const result = pick(obj, [symA])
    expect(result).toEqual({
      [symA]: 'valueA',
    })
  })

  it('should pick elements by index from an array', () => {
    const arr = [10, 20, 30, 40, 50]
    const result = pick(arr, [0, 2, 4])
    expect(result).toEqual({
      '0': 10,
      '2': 30,
      '4': 50,
    })
  })
})

describe('omit', () => {
  it('should omit specified string keys from an object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omit(obj, ['b'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should omit specified symbol keys from an object', () => {
    const symA = Symbol('a')
    const symB = Symbol('b')
    const obj = {
      [symA]: 'valueA',
      [symB]: 'valueB',
      c: 3,
    }

    const result = omit(obj, [symA])
    expect(result).toEqual({
      [symB]: 'valueB',
      c: 3,
    })
  })

  it('should omit elements by index from an array', () => {
    const arr = [10, 20, 30, 40, 50]
    const result = omit(arr, [1, 3])
    expect(result).toEqual([10, 30, 50])
  })
})

describe('pickBy', () => {
  it('should pick properties from an object based on the predicate for string keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = pickBy(obj, (value) => value % 2 === 1)
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should pick properties from an object based on the predicate for symbol keys', () => {
    const symA = Symbol('a')
    const symB = Symbol('b')
    const obj = {
      [symA]: 1,
      [symB]: 2,
      c: 3,
    }
    const result = pickBy(obj, (value) => value === 2)
    expect(result).toEqual({ [symB]: 2 })
  })

  it('should pick elements from an array based on the predicate', () => {
    const arr: number[] = [10, 15, 20, 25, 30] // Explicitly specify the array as number[]
    const result = pickBy(arr, (value) => value > 15)
    expect(result).toEqual([20, 25, 30])
  })
})

describe('omitBy', () => {
  it('should omit properties from an object based on the predicate for string keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omitBy(obj, (value) => value % 2 === 1)
    expect(result).toEqual({ b: 2 })
  })

  it('should omit properties from an object based on the predicate for symbol keys', () => {
    const symA = Symbol('a')
    const symB = Symbol('b')
    const obj = {
      [symA]: 1,
      [symB]: 2,
      c: 3,
    }
    const result = omitBy(obj, (value) => value === 2)
    expect(result).toEqual({ [symA]: 1, c: 3 })
  })

  it('should omit elements from an array based on the predicate', () => {
    const arr = [10, 15, 20, 25, 30]
    const result = omitBy(arr, (value) => value < 20)
    expect(result).toEqual([20, 25, 30])
  })
})
