# tryAsyncCall

Wraps an async function call in a try-catch and returns a `Promise<[error, result]>` tuple instead of throwing. For sync functions, use [tryCall](/function/try-call).

### Usage

```ts
import { tryAsyncCall } from 'rattail'

const [err, result] = await tryAsyncCall(() => fetch('/api'))
// [undefined, Response]

const [err2, result2] = await tryAsyncCall(async () => {
  throw new Error('fail')
})
// [Error, undefined]

// Pass arguments directly
const [err3, result3] = await tryAsyncCall(fetch, '/api')
// [undefined, Response]

const asyncAdd = async (a: number, b: number) => a + b
const [err4, result4] = await tryAsyncCall(asyncAdd, 1, 2)
// [undefined, 3]
```

### Arguments

| Arg       | Type                            | Description               |
| --------- | ------------------------------- | ------------------------- |
| `fn`      | `(...args: Args) => Promise<T>` | An async function to call |
| `...args` | `Args`                          | Arguments to pass to fn   |

### Return

| Type                                              |
| ------------------------------------------------- |
| `Promise<[unknown, undefined] \| [undefined, T]>` |
