import { describe, it, expect, vi } from 'vitest'
import { debounce, throttle, call } from '../src/function'

describe('Utility Functions', () => {
  describe('debounce', () => {
    it('should call the function after the specified delay', async () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      await new Promise((resolve) => setTimeout(resolve, 150))

      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should not call the function if called again before the delay', async () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn()
      debouncedFn()

      await new Promise((resolve) => setTimeout(resolve, 150))

      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle', () => {
    it('should call the function immediately and then at specified intervals', async () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 100)

      throttledFn()
      throttledFn()
      await new Promise((resolve) => setTimeout(resolve, 50))
      throttledFn()
      await new Promise((resolve) => setTimeout(resolve, 100))
      throttledFn()

      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('call', () => {
    it('should call a single function with provided arguments', () => {
      const fn = vi.fn((a: number, b: number) => a + b)
      const result = call(fn, 1, 2)
      expect(result).toBe(3)
      expect(fn).toHaveBeenCalledWith(1, 2)
    })

    it('should call multiple functions and return their results', () => {
      const fn1 = vi.fn((a: number) => a + 1)
      const fn2 = vi.fn((a: number) => a * 2)
      const result = call([fn1, fn2], 2)
      expect(result).toEqual([3, 4])
      expect(fn1).toHaveBeenCalledWith(2)
      expect(fn2).toHaveBeenCalledWith(2)
    })

    it('should return undefined if no function is provided', () => {
      const result = call(null, 1, 2)
      expect(result).toBeUndefined()
    })
  })
})
