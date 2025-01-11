import { expect, it } from 'vitest'
import { clamp, clampArrayRange, delay, genNumberKey, randomNumber, times, toNumber } from '../src'

it('toNumber', () => {
  expect(toNumber(null)).toBe(0)
  expect(toNumber(undefined)).toBe(0)
  expect(toNumber('42')).toBe(42)
  expect(toNumber('42.5')).toBe(42.5)
  expect(toNumber('not a number')).toBe(0)
  expect(toNumber(true)).toBe(1)
  expect(toNumber(false)).toBe(0)
  expect(toNumber(100)).toBe(100)
})

it('clamp', () => {
  expect(clamp(5, 1, 10)).toBe(5)
  expect(clamp(0, 1, 10)).toBe(1)
  expect(clamp(15, 1, 10)).toBe(10)
})

it('clampArrayRange', () => {
  const arr = [1, 2, 3, 4, 5]
  expect(clampArrayRange(2, arr)).toBe(2)
  expect(clampArrayRange(-1, arr)).toBe(0)
  expect(clampArrayRange(10, arr)).toBe(4)
})

it('genNumberKey', () => {
  const key1 = genNumberKey()
  const key2 = genNumberKey()
  expect(key1).not.toBe(key2)
  expect(key1).toBe(0)
  expect(key2).toBe(1)
})

it('randomNumber', () => {
  const min = 5
  const max = 10
  const random = randomNumber(min, max)
  expect(random).toBeGreaterThanOrEqual(min)
  expect(random).toBeLessThanOrEqual(max)
  expect(randomNumber(0, 0)).toBe(0)

  const randomDefault = randomNumber()
  expect(randomDefault).toBeGreaterThanOrEqual(0)
  expect(randomDefault).toBeLessThanOrEqual(100)
})

it('times', () => {
  const arr = times(5, String)
  expect(arr).toEqual(['0', '1', '2', '3', '4'])
})

it('delay', async () => {
  const start = performance.now()
  await delay(100)
  const end = performance.now()
  expect(Math.ceil(end - start)).toBeGreaterThanOrEqual(100)
})
