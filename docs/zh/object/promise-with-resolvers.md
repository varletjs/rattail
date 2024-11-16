# promiseWithResolvers

返回一个对象，其中包含一个新的 `Promise 对象` 以及 `resolve`，`reject` 两个函数用于解决或拒绝它。

### 使用

```ts
import { promiseWithResolvers } from 'rattail'

const { promise, resolve } = promiseWithResolvers()

setTimeout(() => {
  resolve('hello')
}, 300)

await promise
// 300ms 后 return 'hello'
```

### 返回值

| 类型                                                                                       |
| ------------------------------------------------------------------------------------------ |
| `{ promise: Promise<any>; resolve: (value: any) => void; reject: (reason?: any) => void }` |
