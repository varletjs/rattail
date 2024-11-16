export type PromiseWithResolvers<T> = {
  promise: Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

export function promiseWithResolvers<T>(): PromiseWithResolvers<T> {
  let resolve: any
  let reject: any

  const promise = new Promise<T>((_resolver, _reject) => {
    resolve = _resolver
    reject = _reject
  })

  return { promise, resolve, reject }
}
