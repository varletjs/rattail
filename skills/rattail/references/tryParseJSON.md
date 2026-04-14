---
category: Util
---

# tryParseJSON

Attempts to parse a `JSON` string. If parsing fails, returns `undefined`.

## Documentation

- [English](https://rattail.varletjs.org/util/try-parse-JSON)
- [Chinese docs](https://rattail.varletjs.org/zh/util/try-parse-JSON)

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

## Type declarations

```ts
export function tryParseJSON<T>(json: string): T | undefined {
  try {
    return JSON.parse(json)
  } catch {
    return undefined
  }
}
```
