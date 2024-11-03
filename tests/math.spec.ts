import { expect, it } from 'vitest'
import { sum, sumBy, minBy, maxBy, mean, meanBy, sample, sumHash } from '../src'

it('sum', () => {
  expect(sum([1, 2, 3, 4])).toBe(10)
})

it('sumBy', () => {
  expect(sumBy([{ value: 1 }, { value: 2 }, { value: 3 }], (item) => item.value)).toBe(6)
})

it('minBy', () => {
  expect(minBy([{ value: 1 }, { value: 2 }, { value: 3 }], (item) => item.value)).toEqual({ value: 1 })
  expect(minBy<{ value: number }>([], (item) => item.value)).toEqual(undefined)
})

it('maxBy', () => {
  expect(maxBy([{ value: 1 }, { value: 2 }, { value: 3 }], (item) => item.value)).toEqual({ value: 3 })
  expect(maxBy<{ value: number }>([], (item) => item.value)).toEqual(undefined)
})

it('mean', () => {
  expect(mean([1, 2, 3, 4])).toBe(2.5)
})

it('meanBy', () => {
  expect(meanBy([{ value: 1 }, { value: 2 }, { value: 3 }], (item) => item.value)).toBe(2)
})

it('sample', () => {
  expect(sample([1, 2, 3, 4])).toBeGreaterThanOrEqual(1)
  expect(sample([1, 2, 3, 4])).toBeLessThanOrEqual(4)
  expect(sample([])).toEqual(undefined)
})

it('sumHash', () => {
  expect(sumHash(null)).toBe('9b7df12e')
  expect(sumHash(undefined)).toBe('29172c1a')
  expect(sumHash('123')).toBe('1a3a267c')
  expect(sumHash(123)).toBe('64a57068')
  expect(sumHash({ n: 1 })).toBe('66b13e4a')
  expect(sumHash(Object.create({ n: 1 }))).toBe('59322f29')
  expect(sumHash([1, 2, 3])).toBe('352dd8ea')
  expect(sumHash({ a: '123' })).toBe('b1c920ac')
  expect(
    sumHash(() => {
      console.log('123')
    }),
  ).toBe('7842a7e1')

  const a: Record<string, any> = { a: '123', self: undefined }
  a.self = a
  expect(sumHash(a)).toBe('76b6e174')
})
