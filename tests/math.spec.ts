import { expect, it } from 'vitest'
import { sum, sumBy, minBy, maxBy, mean, meanBy, sample } from '../src'

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
