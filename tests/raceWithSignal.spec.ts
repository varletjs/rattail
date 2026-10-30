import { describe, expect, expectTypeOf, it, vi } from 'vite-plus/test'
import { raceWithSignal, promiseWithResolvers } from '../src'

describe('raceWithSignal', () => {
  it('returns the original value and removes the listener on fulfillment', async () => {
    const controller = new AbortController()
    const remove = vi.spyOn(controller.signal, 'removeEventListener')
    const pending = raceWithSignal(Promise.resolve(42), { signal: controller.signal })

    expectTypeOf(pending).toEqualTypeOf<Promise<number>>()
    expect(await pending).toBe(42)
    expect(remove).toHaveBeenCalledWith('abort', expect.any(Function))
  })

  it('propagates rejection and removes the listener', async () => {
    const controller = new AbortController()
    const remove = vi.spyOn(controller.signal, 'removeEventListener')
    const error = new Error('failed')

    await expect(raceWithSignal(Promise.reject(error), { signal: controller.signal })).rejects.toBe(error)
    expect(remove).toHaveBeenCalledWith('abort', expect.any(Function))
  })

  it('rejects promptly with the exact abort reason without cancelling the source', async () => {
    const controller = new AbortController()
    const source = promiseWithResolvers<string>()
    const remove = vi.spyOn(controller.signal, 'removeEventListener')
    const pending = raceWithSignal(source.promise, { signal: controller.signal })
    const reason = { cancelled: true }
    const assertion = expect(pending).rejects.toBe(reason)

    controller.abort(reason)
    await assertion
    expect(remove).toHaveBeenCalledWith('abort', expect.any(Function))
    source.resolve('still completes')
    expect(await source.promise).toBe('still completes')
  })

  it('prioritizes an already aborted signal over an already fulfilled promise', async () => {
    const controller = new AbortController()
    controller.abort('cancelled')

    await expect(raceWithSignal(Promise.resolve(42), { signal: controller.signal })).rejects.toBe('cancelled')
  })

  it('handles source rejection when the signal was already aborted', async () => {
    const controller = new AbortController()
    controller.abort('cancelled')

    await expect(raceWithSignal(Promise.reject(new Error('source')), { signal: controller.signal })).rejects.toBe(
      'cancelled',
    )
  })

  it('handles late source rejection after cancellation', async () => {
    const controller = new AbortController()
    const source = promiseWithResolvers<void>()
    const pending = raceWithSignal(source.promise, { signal: controller.signal })
    const assertion = expect(pending).rejects.toHaveProperty('name', 'AbortError')

    controller.abort()
    await assertion
    source.reject(new Error('late source error'))
    await Promise.resolve()
  })

  it('assimilates thenables', async () => {
    const controller = new AbortController()
    const original = Promise.resolve('value')
    const source = { then: original.then.bind(original) }

    expect(await raceWithSignal(source, { signal: controller.signal })).toBe('value')
  })
})

describe('raceWithSignal edge cases', () => {
  it('preserves a result settled before a later abort', async () => {
    const source = promiseWithResolvers<number>()
    const controller = new AbortController()
    const add = vi.spyOn(controller.signal, 'addEventListener')
    const remove = vi.spyOn(controller.signal, 'removeEventListener')
    const pending = raceWithSignal(source.promise, { signal: controller.signal })

    source.resolve(7)
    await Promise.resolve()
    controller.abort('late cancellation')

    expect(await pending).toBe(7)
    expect(remove.mock.calls[0]?.[1]).toBe(add.mock.calls[0]?.[1])
  })

  it('propagates a throwing then getter and cleans up the listener', async () => {
    const controller = new AbortController()
    const remove = vi.spyOn(controller.signal, 'removeEventListener')
    const error = new Error('then getter failed')
    const source = {
      get then(): PromiseLike<number>['then'] {
        throw error
      },
    }

    await expect(raceWithSignal(source, { signal: controller.signal })).rejects.toBe(error)
    expect(remove).toHaveBeenCalledTimes(1)
  })

  it('observes cancellation triggered during thenable assimilation', async () => {
    const controller = new AbortController()
    const original = Promise.resolve(1)
    const source = {
      get then() {
        controller.abort('cancelled in getter')
        return original.then.bind(original)
      },
    }

    await expect(raceWithSignal(source, { signal: controller.signal })).rejects.toBe('cancelled in getter')
  })

  it('cleans up independent listeners when several waits share a signal', async () => {
    const controller = new AbortController()
    const add = vi.spyOn(controller.signal, 'addEventListener')
    const remove = vi.spyOn(controller.signal, 'removeEventListener')
    const completed = promiseWithResolvers<number>()
    const cancelled = promiseWithResolvers<number>()
    const first = raceWithSignal(completed.promise, { signal: controller.signal })
    const second = raceWithSignal(cancelled.promise, { signal: controller.signal })
    const assertion = expect(second).rejects.toBe('cancelled')

    completed.resolve(1)
    expect(await first).toBe(1)
    controller.abort('cancelled')
    await assertion
    cancelled.reject(new Error('late rejection'))
    await Promise.resolve()

    expect(remove).toHaveBeenCalledTimes(2)
    expect(new Set(remove.mock.calls.map((entry) => entry[1]))).toEqual(
      new Set(add.mock.calls.map((entry) => entry[1])),
    )
  })
})

it('raceWithSignal recursively unwraps the resolved result type', async () => {
  const source = promiseWithResolvers<Promise<number>>()
  const controller = new AbortController()
  const pending = raceWithSignal(source.promise, { signal: controller.signal })

  expectTypeOf(pending).toEqualTypeOf<Promise<number>>()
  source.resolve(Promise.resolve(9))
  expect(await pending).toBe(9)
})
