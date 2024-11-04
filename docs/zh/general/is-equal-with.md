# isEqualWith

深度比较两个值。支持传入一个比较方法，返回 `true` 时表示两个值相等。

### 使用

```ts
import { isEqualWith, isObject } from 'rattail'

isEqualWith([1, 2], ['1', '2'], (v1, v2) => {
  if (!isObject(v1) && !isObject(v2)) {
    return String(v1) === String(v2)
  }
})
// return true
```

### 参数列表

| 参数    |          类型           | 默认值 |
| ------- | :---------------------: | -----: |
| `value` |          `any`          |        |
| `other` |          `any`          |        |
| `fn`    | `(value, other) => any` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
