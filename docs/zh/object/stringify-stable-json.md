# stringifyStableJSON

将值序列化为 JSON，递归排序对象属性。对象内容相同时，即使属性插入顺序不同，也会得到相同的字符串，适合生成缓存 key 和内容指纹。数组保留原有顺序。

### 使用

```ts
import { stringifyStableJSON } from 'rattail'

const first = { b: 2, a: { d: 4, c: 3 } }
const second = { a: { c: 3, d: 4 }, b: 2 }

JSON.stringify(first) === JSON.stringify(second)
// false

stringifyStableJSON(first) === stringifyStableJSON(second)
// true

stringifyStableJSON(first)
// '{"a":{"c":3,"d":4},"b":2}'

stringifyStableJSON({ 2: 'two', 10: 'ten' })
// '{"10":"ten","2":"two"}'

stringifyStableJSON(undefined)
// undefined
```

### 参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `unknown` | 要序列化的值 |

### 返回值

`string | undefined`，沿用原生 JSON 顶层序列化行为。

### 说明

- 对象 key 按字符串字典序排序，包括数字形式的 key。
- 其余序列化行为沿用 `JSON.stringify`，包括 `toJSON` 以及循环引用、不受支持的 `BigInt` 值所产生的异常。
