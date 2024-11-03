# prettyJSONObject

格式化 `JSON` 对象，增加缩进以便于阅读。

### 使用

```ts
import { prettyJSONObject } from 'rattail'

const jsonObject = { key: 'value', nested: { key: 'nestedValue' } }
const pretty = prettyJSONObject(jsonObject)
console.log(pretty)
/*
{
  "key": "value",
  "nested": {
    "key": "nestedValue"
  }
}
*/
```

### 参数

| 参数         | 类型     | 默认值 |
| ------------ | -------- | ------ |
| `jsonObject` | `object` |        |

### 返回值

| 类型     |
| -------- |
| `string` |
