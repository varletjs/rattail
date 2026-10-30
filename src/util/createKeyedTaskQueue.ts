import { NOOP } from '../function/NOOP'

export function createKeyedTaskQueue<Key = string>() {
  const tails = new Map<Key, Promise<unknown>>()

  return { run, isBusy }

  async function run<Result>(key: Key, task: () => Result | PromiseLike<Result>): Promise<Awaited<Result>> {
    const previous = tails.get(key) ?? Promise.resolve()
    const current = previous.catch(NOOP).then(task)

    tails.set(key, current)

    try {
      return await current
    } finally {
      if (tails.get(key) === current) {
        tails.delete(key)
      }
    }
  }

  function isBusy(key: Key) {
    return tails.has(key)
  }
}
