import { it, expect, describe } from 'vitest'
import {
  uniq,
  uniqBy,
  normalizeToArray,
  removeItem,
  toggleItem,
  removeArrayBlank,
  removeArrayEmpty,
  find,
  at,
  shuffle,
  chunk,
} from '../src'

it('uniq', () => {
  const arr = uniq([1, 2, 2, 3, 4, 4])
  expect(arr).toEqual([1, 2, 3, 4])
})

it('uniqBy', () => {
  const arr = uniqBy([{ name: 'a' }, { name: 'a' }], (a, b) => a.name === b.name)
  expect(arr).toEqual([{ name: 'a' }])
})

it('normalizeToArray', () => {
  expect(normalizeToArray(1)).toEqual([1])
  expect(normalizeToArray([1])).toEqual([1])
})

it('removeItem', () => {
  const arr = [1, 2, 3, 4]
  removeItem(arr, 2)
  expect(arr).toEqual([1, 3, 4])
})

it('toggleItem', () => {
  const arr = [1, 2, 3, 4]
  toggleItem(arr, 2)
  expect(arr).toEqual([1, 3, 4])
  toggleItem(arr, 2)
  expect(arr).toEqual([1, 3, 4, 2])
})

it('removeArrayBlank', () => {
  const arr = removeArrayBlank([1, 2, 3, 4, '', null, undefined])
  expect(arr).toEqual([1, 2, 3, 4, ''])
})

it('removeArrayEmpty', () => {
  const arr = removeArrayEmpty([1, 2, 3, 4, '', null, undefined])
  expect(arr).toEqual([1, 2, 3, 4])
})

describe('find', () => {
  it('start', () => {
    const [item, index] = find([1, 2, 3, 4, 3], (item) => item === 3)
    expect(item).toBe(3)
    expect(index).toBe(2)
  })

  it('end', () => {
    const [item, index] = find([1, 2, 3, 4, 3], (item) => item === 3, 'end')
    expect(item).toBe(3)
    expect(index).toBe(4)
  })

  it('not found', () => {
    const [item, index] = find([1, 2, 3, 4, 3], (item) => item === 5)
    expect(item).toBe(null)
    expect(index).toBe(-1)
  })
})

it('at', () => {
  const arr = [1, 2, 3, 4]
  expect(at(arr, 0)).toBe(1)
  expect(at(arr, -1)).toBe(4)
  expect(at(arr, 5)).toBe(undefined)
  expect(at([], 0)).toBe(undefined)
})

it('shuffle', () => {
  const arr = [1, 2, 3, 4, 5]
  const shuffled = shuffle([...arr])
  expect(shuffled.sort()).toEqual(arr)
})

it('chunk', () => {
  expect(chunk([])).toEqual([])
  expect(chunk([1, 2, 3, 4, 5])).toEqual([[1], [2], [3], [4], [5]])
  expect(chunk([1, 2, 3, 4, 5], 0)).toEqual([[1], [2], [3], [4], [5]])
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  expect(chunk([1, 2], 2)).toEqual([[1, 2]])
  expect(chunk([1, 2], 3)).toEqual([[1, 2]])
})
