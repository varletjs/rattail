---
category: Object
---

# promiseWithResolvers

returns an object containing a new Promise object and two functions to `resolve` or `reject` it, corresponding to the two parameters passed to the executor of the `Promise()` constructor.

## Documentation

- [English](https://rattail.varletjs.org/object/promise-with-resolvers)
- [Chinese docs](https://rattail.varletjs.org/zh/object/promise-with-resolvers)

### Usage

```ts
import { promiseWithResolvers } from 'rattail'

const { promise, resolve } = promiseWithResolvers()

setTimeout(() => {
  resolve('hello')
}, 300)

await promise
// after 300ms return 'hello'
```

### Return

| Type                                                                                       |
| ------------------------------------------------------------------------------------------ |
| `{ promise: Promise<any>; resolve: (value: any) => void; reject: (reason?: any) => void }` |

## Type declarations

```ts
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
```
