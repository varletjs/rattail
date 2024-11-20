# isEmptyPlainObject

判断输入值是否为空（没有自身的可枚举 key 并且没有 symbol）的普通对象。

### 使用

```ts
import { isEmptyPlainObject } from 'rattail'

isEmptyPlainObject({}) // return true
isEmptyPlainObject(Object.create(null)) // return true
isEmptyPlainObject([]) // return false
isEmptyPlainObject({ a: 1 }) // return false
isEmptyPlainObject({ [Symbol()]: 1 }) // return false
```

### 参数

| 参数    | 类型  | 默认值 |
| ------- | :---: | -----: |
| `value` | `any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
