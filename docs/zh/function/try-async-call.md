# tryAsyncCall

将异步函数调用包裹在 try-catch 中，返回 `Promise<[error, result]>` 元组而非抛出异常。同步函数请使用 [tryCall](/zh/function/try-call)。

### 用法

```ts
import { tryAsyncCall } from 'rattail'

const [err, result] = await tryAsyncCall(() => fetch('/api'))
// [undefined, Response]

const [err2, result2] = await tryAsyncCall(async () => {
  throw new Error('fail')
})
// [Error, undefined]

// 直接传参
const [err3, result3] = await tryAsyncCall(fetch, '/api')
// [undefined, Response]

const asyncAdd = async (a: number, b: number) => a + b
const [err4, result4] = await tryAsyncCall(asyncAdd, 1, 2)
// [undefined, 3]
```

### 参数

| 参数      | 类型                            | 说明             |
| --------- | ------------------------------- | ---------------- |
| `fn`      | `(...args: Args) => Promise<T>` | 异步函数         |
| `...args` | `Args`                          | 传递给 fn 的参数 |

### 返回值

| 类型                                              |
| ------------------------------------------------- |
| `Promise<[unknown, undefined] \| [undefined, T]>` |
