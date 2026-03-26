# tryCall

将同步函数调用包裹在 try-catch 中，返回 `[error, result]` 元组而非抛出异常。异步函数请使用 [tryAsyncCall](/zh/function/try-async-call)。

### 用法

```ts
import { tryCall } from 'rattail'

const [err, result] = tryCall(() => JSON.parse('{"a":1}'))
// [undefined, { a: 1 }]

const [err2, result2] = tryCall(() => JSON.parse('invalid'))
// [SyntaxError, undefined]

// 直接传参
const [err3, result3] = tryCall(JSON.parse, '{"a":1}')
// [undefined, { a: 1 }]

const [err4, result4] = tryCall((a: number, b: number) => a + b, 1, 2)
// [undefined, 3]
```

### 参数

| 参数      | 类型                   | 说明             |
| --------- | ---------------------- | ---------------- |
| `fn`      | `(...args: Args) => T` | 同步函数         |
| `...args` | `Args`                 | 传递给 fn 的参数 |

### 返回值

| 类型                                     |
| ---------------------------------------- |
| `[unknown, undefined] \| [undefined, T]` |
