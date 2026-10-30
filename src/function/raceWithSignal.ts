import { promiseWithResolvers } from '../object/promiseWithResolvers'

export async function raceWithSignal<Value>(
  promise: PromiseLike<Value>,
  { signal }: { signal: AbortSignal },
): Promise<Awaited<Value>> {
  const pending = promiseWithResolvers<Awaited<Value>>()

  try {
    Promise.resolve(promise).then(pending.resolve, pending.reject)

    if (signal.aborted) {
      abort()
    } else {
      signal.addEventListener('abort', abort, { once: true })
    }

    return await pending.promise
  } finally {
    signal.removeEventListener('abort', abort)
  }

  function abort() {
    pending.reject(signal.reason)
  }
}
