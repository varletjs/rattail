import { describe, expect, expectTypeOf, it } from 'vite-plus/test'
import { createKeyedTaskQueue, promiseWithResolvers } from '../src'

describe('createKeyedTaskQueue', () => {
  it('runs tasks with the same key in FIFO order and releases idle keys', async () => {
    const queue = createKeyedTaskQueue()
    const gate = promiseWithResolvers<void>()
    const events: string[] = []
    const first = queue.run('a', async () => {
      events.push('first-start')
      await gate.promise
      events.push('first-end')
      return 1
    })
    const second = queue.run('a', () => {
      events.push('second')
      return 'done'
    })

    expect(queue.isBusy('a')).toBe(true)
    await Promise.resolve()
    await Promise.resolve()
    expect(events).toEqual(['first-start'])

    gate.resolve()
    expect(await first).toBe(1)
    expect(await second).toBe('done')
    expect(events).toEqual(['first-start', 'first-end', 'second'])
    expect(queue.isBusy('a')).toBe(false)
    expectTypeOf(first).toEqualTypeOf<Promise<number>>()
    expectTypeOf(second).toEqualTypeOf<Promise<string>>()
  })

  it('runs different keys independently', async () => {
    const queue = createKeyedTaskQueue()
    const gate = promiseWithResolvers<void>()
    const first = queue.run('a', () => gate.promise)

    expect(await queue.run('b', () => 2)).toBe(2)
    expect(queue.isBusy('a')).toBe(true)
    expect(queue.isBusy('b')).toBe(false)
    gate.resolve()
    await first
  })

  it('propagates synchronous throws and continues with queued tasks', async () => {
    const queue = createKeyedTaskQueue()
    const error = new Error('failed')
    const failed = queue.run('a', () => {
      throw error
    })
    const assertion = expect(failed).rejects.toBe(error)
    const next = queue.run('a', () => 3)

    await assertion
    expect(await next).toBe(3)
    expect(queue.isBusy('a')).toBe(false)
  })

  it('propagates asynchronous rejections and allows reusing the key', async () => {
    const queue = createKeyedTaskQueue()
    const error = new Error('failed')

    await expect(queue.run('a', () => Promise.reject(error))).rejects.toBe(error)
    expect(queue.isBusy('a')).toBe(false)
    expect(await queue.run('a', () => 4)).toBe(4)
  })

  it('does not release a key while later tasks are still pending', async () => {
    const queue = createKeyedTaskQueue()
    const gate = promiseWithResolvers<void>()
    const first = queue.run('a', () => 1)
    const second = queue.run('a', () => gate.promise)

    await first
    expect(queue.isBusy('a')).toBe(true)
    gate.resolve()
    await second
    expect(queue.isBusy('a')).toBe(false)
  })

  it('uses Map key identity and keeps separate instances independent', async () => {
    const queue = createKeyedTaskQueue<object>()
    const other = createKeyedTaskQueue<object>()
    const firstKey = {}
    const secondKey = {}
    const gate = promiseWithResolvers<void>()
    const first = queue.run(firstKey, () => gate.promise)

    expect(await queue.run(secondKey, () => 2)).toBe(2)
    expect(await other.run(firstKey, () => 3)).toBe(3)
    expect(queue.isBusy(firstKey)).toBe(true)
    expect(other.isBusy(firstKey)).toBe(false)
    gate.resolve()
    await first
  })
})

describe('createKeyedTaskQueue edge cases', () => {
  it('keeps FIFO order when a running task enqueues another task', async () => {
    const queue = createKeyedTaskQueue()
    const events: number[] = []
    let nested: Promise<void> | undefined
    const first = queue.run('a', () => {
      events.push(1)
      nested = queue.run('a', () => {
        events.push(3)
      })
    })
    const second = queue.run('a', () => {
      events.push(2)
    })

    await first
    await second
    await nested
    expect(events).toEqual([1, 2, 3])
    expect(queue.isBusy('a')).toBe(false)
  })

  it('continues after an asynchronous failure while later tasks are already queued', async () => {
    const queue = createKeyedTaskQueue()
    const source = promiseWithResolvers<void>()
    const first = queue.run('a', () => source.promise)
    const assertion = expect(first).rejects.toBe('failed')
    const second = queue.run('a', () => 2)
    const third = queue.run('a', () => 3)

    source.reject('failed')
    await assertion
    expect(await second).toBe(2)
    expect(await third).toBe(3)
    expect(queue.isBusy('a')).toBe(false)
  })

  it('assimilates task thenables and handles a throwing then getter', async () => {
    const queue = createKeyedTaskQueue()
    const original = Promise.resolve(5)
    const source = { then: original.then.bind(original) }
    const result = queue.run('a', () => source)
    expectTypeOf(result).toEqualTypeOf<Promise<number>>()
    expect(await result).toBe(5)
    const error = new Error('then getter failed')
    const failed = queue.run('a', () => ({
      get then(): PromiseLike<number>['then'] {
        throw error
      },
    }))

    await expect(failed).rejects.toBe(error)
    expect(queue.isBusy('a')).toBe(false)
  })

  it.each([undefined, NaN, '__proto__', Symbol('key')])('handles the Map key %s', async (key) => {
    const queue = createKeyedTaskQueue<typeof key>()
    const source = promiseWithResolvers<number>()
    const first = queue.run(key, () => source.promise)
    const second = queue.run(key, () => 2)

    expect(queue.isBusy(key)).toBe(true)
    source.resolve(1)
    expect(await first).toBe(1)
    expect(await second).toBe(2)
    expect(queue.isBusy(key)).toBe(false)
  })
})

it('createKeyedTaskQueue recursively unwraps the task result type', async () => {
  const queue = createKeyedTaskQueue()
  const source = promiseWithResolvers<Promise<number>>()
  const pending = queue.run('a', () => source.promise)

  expectTypeOf(pending).toEqualTypeOf<Promise<number>>()
  source.resolve(Promise.resolve(9))
  expect(await pending).toBe(9)
})
