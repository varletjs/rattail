import { describe, expect, it, vi } from 'vitest'
import { call, debounce, once, throttle } from '../src'

describe('Utility Functions', () => {
  describe('debounce', () => {
    it('should call the function with the default delay', async () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      await new Promise((resolve) => {
        setTimeout(resolve, 250)
      })

      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should call the function after the specified delay', async () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      await new Promise((resolve) => {
        setTimeout(resolve, 150)
      })

      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should not call the function if called again before the delay', async () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn()
      debouncedFn()

      await new Promise((resolve) => {
        setTimeout(resolve, 150)
      })

      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle', () => {
    it('should call the function immediately and then at default intervals', async () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn)

      throttledFn()
      throttledFn()
      await new Promise((resolve) => {
        setTimeout(resolve, 50)
      })
      throttledFn()
      await new Promise((resolve) => {
        setTimeout(resolve, 200)
      })
      throttledFn()

      expect(fn).toHaveBeenCalledTimes(2)
    })

    it('should call the function immediately and then at specified intervals', async () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 100)

      throttledFn()
      throttledFn()
      await new Promise((resolve) => {
        setTimeout(resolve, 50)
      })
      throttledFn()
      await new Promise((resolve) => {
        setTimeout(resolve, 100)
      })
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

  it('once', () => {
    const rt = {}
    const fn = vi.fn(() => rt)
    const onceFn = once(fn)

    const r1 = onceFn()
    const r2 = onceFn()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(r1).toBe(rt)
    expect(r1).toBe(r2)
  })
})
