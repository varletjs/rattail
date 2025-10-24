import { describe, expect, it } from 'vitest'
import { mapObject, omit, omitBy, pick, pickBy, promiseWithResolvers, set } from '../src'
import { objectEntries } from '../src/object/objectEntries'
import { objectKeys } from '../src/object/objectKeys'

describe('pick', () => {
  it('should pick specified string keys from an object', () => {
    const result = pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should pick specified symbol keys from an object', () => {
    const a = Symbol('a')

    const result = pick(
      {
        [a]: 1,
        b: 3,
      },
      [a],
    )

    expect(result).toEqual({
      [a]: 1,
    })
  })
})

it('pickBy', () => {
  expect(pickBy({ a: 1, b: 2, c: 3 }, (value) => value === 2)).toEqual({ b: 2 })
  expect(pickBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)).toEqual({ b: 2, c: 3 })
  expect(pickBy({ a: 1, b: 2, c: 3 }, (value, key) => key !== 'a')).toEqual({ b: 2, c: 3 })

  const a = Symbol('a')
  expect(
    pickBy(
      {
        [a]: 1,
        b: 2,
      },
      (value, key) => key === a,
    ),
  ).toEqual({ [a]: 1 })
})

it('omit', () => {
  expect(omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ b: 2 })
  const a = Symbol('a')

  expect(
    omit(
      {
        [a]: 1,
        b: 2,
      },
      [a],
    ),
  ).toEqual({
    b: 2,
  })
})

it('omitBy', () => {
  expect(omitBy({ a: 1, b: 2, c: 3 }, (value) => value > 1)).toEqual({ a: 1 })
  expect(omitBy({ a: 1, b: 2, c: 3 }, (value, key) => key !== 'a')).toEqual({ a: 1 })

  const a = Symbol('a')
  const result = omitBy(
    {
      [a]: 1,
      b: 2,
    },
    (value, key) => key === a,
  )
  expect(result).toEqual({ b: 2 })
})

it('mapObject', () => {
  expect(mapObject({ a: 1, b: 2 }, (key, value) => [key, value * 2])).toEqual({ a: 2, b: 4 })
  expect(mapObject({ a: 1, b: 2 }, (key, value) => [`${key}${value}`, value])).toEqual({ a1: 1, b2: 2 })
  expect(mapObject({ a: 1, b: 2 }, (key, value) => (value === 1 ? [key, value] : undefined))).toEqual({ a: 1 })
})

describe('promiseWithResolvers', () => {
  it('resolve', async () => {
    const { promise, resolve } = promiseWithResolvers<number>()
    setTimeout(() => resolve(1))
    const result = await promise
    expect(result).toBe(1)
  })

  it('reject', async () => {
    const { promise, reject } = promiseWithResolvers<number>()
    setTimeout(() => reject(new Error('test')))
    await expect(promise).rejects.toThrow('test')
  })
})

it('set', () => {
  const a = {}
  set(a, ['b', 'c', 0, 'd'], 1)

  const a1 = { b: 2 }
  set(a1, ['b', 'c', 0, 'd'], 1)
  expect(a1).toEqual({ b: { c: [{ d: 1 }] } })

  const a2 = { b: { c: [{ e: 2 }] } }
  set(a2, ['b', 'c', 0, 'd'], 1)
  expect(a2).toEqual({ b: { c: [{ e: 2, d: 1 }] } })

  const a3 = { b: { c: [] } }
  set(a3, ['b', 'c', 0, 'd'], 1)
  expect(a3).toEqual({ b: { c: [{ d: 1 }] } })

  const a4 = { b: { c: [{ d: 2 }] } }
  set(a4, ['b', 'c', 0, 'd'], 1)
  expect(a4).toEqual({ b: { c: [{ d: 1 }] } })

  const a5 = { b: { c: null } }
  set(a5, ['b', 'c'], 1)
  expect(a5).toEqual({ b: { c: 1 } })

  const a6 = {}
  set(a6, ['b'], 1)
  expect(a6).toEqual({ b: 1 })

  const a7 = [{ a: 1 }]
  set(a7, [0, 'b'], 1)
  expect(a7).toEqual([{ a: 1, b: 1 }])

  const a8 = [{ a: 2 }]
  set(a8, [0, 0, 0], 1)
  expect(a8).toEqual([{ a: 2, 0: [1] }])
})

describe('objectEntries', () => {
  it('should return entries for a simple object', () => {
    const obj = { a: 1, b: 2 }
    expect(objectEntries(obj)).toEqual([
      ['a', 1],
      ['b', 2],
    ])
  })

  it('should work with empty object', () => {
    expect(objectEntries({})).toEqual([])
  })

  it('should preserve key types', () => {
    const obj = { foo: 1, bar: 'baz' }
    const entries = objectEntries(obj)
    expect(entries).toContainEqual(['foo', 1])
    expect(entries).toContainEqual(['bar', 'baz'])
  })
})

describe('objectKeys', () => {
  it('should return keys for a simple object', () => {
    const obj = { a: 1, b: 2 }
    expect(objectKeys(obj)).toEqual(['a', 'b'])
  })

  it('should work with empty object', () => {
    expect(objectKeys({})).toEqual([])
  })

  it('should preserve key types', () => {
    const obj = { foo: 1, bar: 'baz' }
    const keys = objectKeys(obj)
    expect(keys).toContain('foo')
    expect(keys).toContain('bar')
  })
})
