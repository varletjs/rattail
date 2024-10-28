import { describe, it, expect } from 'vitest'
import { toNumber, clamp, clampArrayRange, genNumberKey, randomNumber } from '../src/number'

describe('Number utility functions', () => {
  it('should convert various types to number', () => {
    expect(toNumber(null)).toBe(0)
    expect(toNumber(undefined)).toBe(0)
    expect(toNumber('42')).toBe(42)
    expect(toNumber('42.5')).toBe(42.5)
    expect(toNumber('not a number')).toBe(0)
    expect(toNumber(true)).toBe(1)
    expect(toNumber(false)).toBe(0)
    expect(toNumber(100)).toBe(100)
  })

  it('should clamp a number within a range', () => {
    expect(clamp(5, 1, 10)).toBe(5)
    expect(clamp(0, 1, 10)).toBe(1)
    expect(clamp(15, 1, 10)).toBe(10)
  })

  it('should clamp an index within an array range', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(clampArrayRange(2, arr)).toBe(2)
    expect(clampArrayRange(-1, arr)).toBe(0)
    expect(clampArrayRange(10, arr)).toBe(4)
  })

  it('should generate unique number keys', () => {
    const key1 = genNumberKey()
    const key2 = genNumberKey()
    expect(key1).not.toBe(key2)
    expect(key1).toBe(0)
    expect(key2).toBe(1)
  })

  it('should generate a random number within a range', () => {
    const min = 5
    const max = 10
    const random = randomNumber(min, max)
    expect(random).toBeGreaterThanOrEqual(min)
    expect(random).toBeLessThanOrEqual(max)
  })
})
