import { describe, it, expect } from 'vitest'
import { mergeWith } from '../src'

describe('mergeWith', () => {
  it('should merge two objects', () => {
    const object = { a: 1, b: { c: 2 } }
    const source = { b: { d: 3 }, e: 4 }
    const result = mergeWith(object, source)

    expect(result).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 })
  })

  it('should use the callback to override values', () => {
    const object = { a: 1, b: 2 }
    const source = { a: 3, b: 4 }
    const result = mergeWith(object, source, (objValue, srcValue) => objValue + srcValue)

    expect(result).toEqual({ a: 4, b: 6 })
  })

  it('should handle nested merges', () => {
    const object = { a: { b: 1 } }
    const source = { a: { c: 2 } }
    const result = mergeWith(object, source)

    expect(result).toEqual({ a: { b: 1, c: 2 } })

    const object2 = { a: 1 }
    const source2 = { b: { c: 1 } }
    const result2 = mergeWith(object2, source2)

    expect(result2).toEqual({ a: 1, b: { c: 1 } })
  })

  it('should create new properties if they don’t exist in the target', () => {
    const object = { a: 1 }
    const source = { b: 2 }
    const result = mergeWith(object, source)

    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('should handle array merging correctly', () => {
    const object = { a: [1, 2] }
    const source = { a: [3, 4] }
    const result = mergeWith(object, source)

    expect(result).toEqual({ a: [3, 4] })
  })

  it('should use callback for array merging', () => {
    const object = { a: [1, 2] }
    const source = { a: [3, 4] }
    const result = mergeWith(object, source, (objValue, srcValue) => [...objValue, ...srcValue])

    expect(result).toEqual({ a: [1, 2, 3, 4] })
  })
})
