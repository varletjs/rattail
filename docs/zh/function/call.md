# call

调用单个函数或多个函数（通过数组传入），并传递参数给它们。

### 使用

```ts
import { call } from 'rattail'

const fns = [(a, b) => a + b, (a, b) => a * b]

call(fns[0], 1, 2) // return 3
call(fns, 1, 2) // return [3, 2]
call(null) // return undefined
```

### 类型声明

```ts
export function call<P extends any[], R>(
  fn?: ((...arg: P) => R) | ((...arg: P) => R)[] | null,
  ...args: P
): R | R[] | undefined
```
