# hasOwn

判断对象是否具有某个 `自有（非继承）` 属性。

### 使用

```ts
import { hasOwn } from 'rattail'

const obj = { foo: 123 }
hasOwn(obj, 'foo') // return true
hasOwn(obj, 'bar') // return false
```

### 参数

| 参数    |   类型   | 默认值 |
| ------- | :------: | -----: |
| `value` | `object` |        |
| `key`   | `string` |        |

### 返回值

|   类型    |
| :-------: |
| `boolean` |
