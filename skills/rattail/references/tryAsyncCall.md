---
category: Function
---

# tryAsyncCall

Safely call an async function and return a `Promise<[error, result]>` tuple. If the async function rejects, the error is captured in the first element; otherwise the resolved result is in the second element.

## Documentation

- [English](https://rattail.varletjs.org/function/try-async-call)
- [Chinese docs](https://rattail.varletjs.org/zh/function/try-async-call)

### Usage

```ts
import { tryAsyncCall } from 'rattail'

const [err, result] = await tryAsyncCall(fetchData, '/api/users')
// err = undefined, result = data

const [err2, result2] = await tryAsyncCall(fetchData, '/api/404')
// err2 = Error, result2 = undefined
```

### Arguments

| Arg       |              Type               | Defaults |
| --------- | :-----------------------------: | -------: |
| `fn`      | `(...args: Args) => Promise<T>` |          |
| `...args` |             `Args`              |          |

### Return

|                       Type                        |
| :-----------------------------------------------: |
| `Promise<[unknown, undefined] \| [undefined, T]>` |

## Type declarations

```ts
export async function tryAsyncCall<Args extends any[], T>(
  fn: (...args: Args) => Promise<T>,
  ...args: Args
): Promise<[unknown, undefined] | [undefined, T]>
```
