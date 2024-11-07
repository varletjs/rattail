import { describe, expect, it } from 'vitest'
import { omit, omitBy, pick, pickBy } from '../src'

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
