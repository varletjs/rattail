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
  difference,
  differenceWith,
  intersection,
  intersectionWith,
  groupBy,
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

it('difference', () => {
  const a = [1, 2, 3, 4]
  expect(difference(a)).toEqual([1, 2, 3, 4])
  expect(difference(a)).not.toBe(a)

  const b = [1, 2, 3, 4]
  expect(difference(b, [2, 3])).toEqual([1, 4])
  expect(difference(b, [2, 3])).not.toBe(b)

  const c = [1, 2, 3, 4]
  expect(difference(c, [2, 3], [3, 4])).toEqual([1])
  expect(difference(c, [2, 3], [3, 4])).not.toBe(c)
})

it('differenceWith', () => {
  const a = [{ num: 1 }, { num: 2 }, { num: 3 }]
  expect(differenceWith(a, (a, b) => a.num === b.num)).toEqual([{ num: 1 }, { num: 2 }, { num: 3 }])
  expect(differenceWith(a, (a, b) => a.num === b.num)).not.toBe(a)

  const b = [{ num: 1 }, { num: 2 }, { num: 3 }]
  expect(differenceWith(b, [{ num: 2 }], (a, b) => a.num === b.num)).toEqual([{ num: 1 }, { num: 3 }])
  expect(differenceWith(b, [{ num: 2 }], (a, b) => a.num === b.num)).not.toBe(b)

  const c = [{ num: 1 }, { num: 2 }, { num: 3 }]
  expect(differenceWith(c, [{ num: 2 }], [{ num: 3 }], (a, b) => a.num === b.num)).toEqual([{ num: 1 }])
  expect(differenceWith(c, [{ num: 2 }], [{ num: 3 }], (a, b) => a.num === b.num)).not.toBe(c)
})

it('intersection', () => {
  expect(intersection()).toEqual([])

  const a = [1, 2, 3, 3]
  expect(intersection(a)).toEqual([1, 2, 3])
  expect(intersection(a)).not.toBe(a)

  const b = [1, 2, 3, 3]
  expect(intersection(b, [2, 3, 4])).toEqual([2, 3])
  expect(intersection(b, [2, 3, 4])).not.toBe(b)

  const c = [1, 2, 3, 3]
  expect(intersection(c, [2, 3, 4], [3, 4, 5])).toEqual([3])
  expect(intersection(c, [2, 3, 4], [3, 4, 5])).not.toBe(c)
})

it('intersectionWith', () => {
  expect(intersectionWith((a, b) => a === b)).toEqual([])

  const a = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 3 }]
  expect(intersectionWith(a, (a, b) => a.num === b.num)).toEqual([{ num: 1 }, { num: 2 }, { num: 3 }])
  expect(intersectionWith(a, (a, b) => a.num === b.num)).not.toBe(a)

  const b = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 3 }]
  expect(intersectionWith(b, [{ num: 2 }], (a, b) => a.num === b.num)).toEqual([{ num: 2 }])
  expect(intersectionWith(b, [{ num: 2 }], (a, b) => a.num === b.num)).not.toBe(b)

  const c = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 3 }]
  expect(intersectionWith(c, [{ num: 2 }], [{ num: 3 }], (a, b) => a.num === b.num)).toEqual([])
  expect(intersectionWith(c, [{ num: 2 }], [{ num: 3 }], (a, b) => a.num === b.num)).not.toBe(c)
})

it('groupBy', () => {
  expect(groupBy([1, 2, 3, 4, 5], (val) => (val % 2 === 0 ? 'even' : 'odd'))).toEqual({
    odd: [1, 3, 5],
    even: [2, 4],
  })

  expect(
    groupBy(
      [
        { name: 'a', gender: 'female' },
        { name: 'b', gender: 'female' },
        { name: 'c', gender: 'male' },
      ],
      (val) => val.gender,
    ),
  ).toEqual({
    female: [
      { name: 'a', gender: 'female' },
      { name: 'b', gender: 'female' },
    ],
    male: [{ name: 'c', gender: 'male' }],
  })
})
