# callOrReturn

如果传入的是函数，则调用该函数并传递参数，否则直接返回该值。

### 使用

```ts
import { callOrReturn } from 'rattail'

const fn = (x: number) => x * 2
callOrReturn(fn, 3) // 6

callOrReturn(5) // 5
```

### 参数

| 参数      | 类型    | 说明                          |
| --------- | ------- | ----------------------------- |
| `input`   | `any`   | 一个函数或任意值              |
| `...args` | `any[]` | 如果 input 是函数则传递的参数 |

### 返回值

| 类型  | 说明               |
| ----- | ------------------ |
| `any` | 函数调用结果或原值 |

### 注意事项

- 如果 `input` 是函数，则会用参数调用。
- 如果 `input` 不是函数，则原样返回。
