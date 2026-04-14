---
category: Function
---

# callOrReturn

Calls a function with the provided arguments if the input is a function, otherwise returns the input value directly.

## Documentation

- [English](https://rattail.varletjs.org/function/call-or-return)
- [Chinese docs](https://rattail.varletjs.org/zh/function/call-or-return)

### Usage

```ts
import { callOrReturn } from 'rattail'

const fn = (x: number) => x * 2
callOrReturn(fn, 3) // 6

callOrReturn(5) // 5
```

### Arguments

| Arg       | Type    | Description                              |
| --------- | ------- | ---------------------------------------- |
| `input`   | `any`   | A function or a value                    |
| `...args` | `any[]` | Arguments to pass if input is a function |

### Return

| Type  | Description                                          |
| ----- | ---------------------------------------------------- |
| `any` | The result of the function call, or the value itself |

### Notes

- If `input` is a function, it will be called with the provided arguments.
- If `input` is not a function, it will be returned as is.

## Type declarations

```ts
import { isFunction } from '../general'

export function callOrReturn<T, A extends any[]>(fnOrValue: T | ((...args: A) => T), ...args: A): T {
  if (isFunction(fnOrValue)) {
    return fnOrValue(...args)
  }

  return fnOrValue
}
```
