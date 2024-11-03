# tryParseJSON

尝试解析 `JSON` 字符串。如果解析失败，返回 `undefined`。

### 使用

```ts
import { tryParseJSON } from 'rattail'

const jsonString = '{"key": "value"}'
const parsed = tryParseJSON(jsonString)
console.log(parsed) // { key: "value" }

const invalidJsonString = '{"key": value}'
const invalidParsed = tryParseJSON(invalidJsonString)
console.log(invalidParsed) // undefined
```

### 参数

| 参数   | 类型     | 默认值 |
| ------ | -------- | ------ |
| `json` | `string` |        |

### 返回值

| 类型                  |
| --------------------- |
| `object \| undefined` |
