# promiseWithResolvers

returns an object containing a new Promise object and two functions to `resolve` or `reject` it, corresponding to the two parameters passed to the executor of the `Promise()` constructor.

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
