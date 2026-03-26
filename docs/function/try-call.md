# tryCall

Wraps a synchronous function call in a try-catch and returns an `[error, result]` tuple instead of throwing. For async functions, use [tryAsyncCall](/function/try-async-call).

### Usage

```ts
import { tryCall } from 'rattail'

const [err, result] = tryCall(() => JSON.parse('{"a":1}'))
// [undefined, { a: 1 }]

const [err2, result2] = tryCall(() => JSON.parse('invalid'))
// [SyntaxError, undefined]

// Pass arguments directly
const [err3, result3] = tryCall(JSON.parse, '{"a":1}')
// [undefined, { a: 1 }]

const [err4, result4] = tryCall((a: number, b: number) => a + b, 1, 2)
// [undefined, 3]
```

### Arguments

| Arg       | Type                   | Description             |
| --------- | ---------------------- | ----------------------- |
| `fn`      | `(...args: Args) => T` | A sync function to call |
| `...args` | `Args`                 | Arguments to pass to fn |

### Return

| Type                                     |
| ---------------------------------------- |
| `[unknown, undefined] \| [undefined, T]` |
