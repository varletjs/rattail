# tryParseJSON

Attempts to parse a `JSON` string. If parsing fails, returns `undefined`.

### Usage

```ts
import { tryParseJSON } from 'rattail'

const jsonString = '{"key": "value"}'
const parsed = tryParseJSON(jsonString)
console.log(parsed) // { key: "value" }

const invalidJsonString = '{"key": value}'
const invalidParsed = tryParseJSON(invalidJsonString)
console.log(invalidParsed) // undefined
```

### Arguments

| Arg    | Type     | Defaults |
| ------ | -------- | -------- |
| `json` | `string` |          |

### Return

| Type                  |
| --------------------- |
| `object \| undefined` |
