import { describe, expect, it, vi } from 'vite-plus/test'
import { call, callOrReturn, debounce, once, throttle, tryAsyncCall, tryCall } from '../src'

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

  it('callOrReturn', () => {
    const fn = vi.fn((x: number, y: number) => x + y)

    const result1 = callOrReturn(fn, 2, 3)
    expect(result1).toBe(5)
    expect(fn).toHaveBeenCalledWith(2, 3)

    const result2 = callOrReturn(10)
    expect(result2).toBe(10)
  })

  describe('tryCall', () => {
    it('should return [undefined, result] on success', () => {
      const [err, result] = tryCall(() => 42)
      expect(err).toBeUndefined()
      expect(result).toBe(42)
    })

    it('should return [error, undefined] on throw', () => {
      const error = new Error('fail')
      const [err, result] = tryCall(() => {
        throw error
      })
      expect(err).toBe(error)
      expect(result).toBeUndefined()
    })

    it('should catch non-Error throws', () => {
      const [err, result] = tryCall(() => {
        throw 'string error'
      })
      expect(err).toBe('string error')
      expect(result).toBeUndefined()
    })

    it('should pass arguments to the function', () => {
      const [err, result] = tryCall((a: number, b: number) => a + b, 1, 2)
      expect(err).toBeUndefined()
      expect(result).toBe(3)
    })

    it('should pass arguments and catch errors', () => {
      const [err, result] = tryCall(JSON.parse, 'invalid')
      expect(err).toBeInstanceOf(SyntaxError)
      expect(result).toBeUndefined()
    })
  })

  describe('tryAsyncCall', () => {
    it('should return [undefined, result] on async success', async () => {
      const [err, result] = await tryAsyncCall(() => Promise.resolve(42))
      expect(err).toBeUndefined()
      expect(result).toBe(42)
    })

    it('should return [error, undefined] on async rejection', async () => {
      const error = new Error('async fail')
      // eslint-disable-next-line require-await
      const [err, result] = await tryAsyncCall(async () => {
        throw error
      })
      expect(err).toBe(error)
      expect(result).toBeUndefined()
    })

    it('should catch non-Error async throws', async () => {
      const [err, result] = await tryAsyncCall(() => Promise.reject('rejected'))
      expect(err).toBe('rejected')
      expect(result).toBeUndefined()
    })

    it('should pass arguments to the async function', async () => {
      // eslint-disable-next-line require-await
      const asyncAdd = async (a: number, b: number) => a + b
      const [err, result] = await tryAsyncCall(asyncAdd, 3, 4)
      expect(err).toBeUndefined()
      expect(result).toBe(7)
    })
  })
})
