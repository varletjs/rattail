import { it, expect } from 'vitest'
import { isNonEmptyArray } from '../src'

it('isNonEmptyArray', () => {
  expect(isNonEmptyArray([])).toBe(false)
  expect(isNonEmptyArray([1, 2])).toBe(true)
})
