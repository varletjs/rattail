# call

Call a single function or multiple functions (passed as an array) and pass arguments to them.

### Usage

```ts
import { call } from 'rattail'

const fns = [(a, b) => a + b, (a, b) => a * b]

call(fns[0], 1, 2) // return 3
call(fns, 1, 2) // return [3, 2]
call(null) // return undefined
```

### Type Declarations

```ts
export function call<P extends any[], R>(
  fn?: ((...arg: P) => R) | ((...arg: P) => R)[] | null,
  ...args: P
): R | R[] | undefined
```
