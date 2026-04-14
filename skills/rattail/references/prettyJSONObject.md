---
category: Util
---

# prettyJSONObject

Formats a `JSON` object with indentation for easy readability.

## Documentation

- [English](https://rattail.varletjs.org/util/pretty-JSON-object)
- [Chinese docs](https://rattail.varletjs.org/zh/util/pretty-JSON-object)

### Usage

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

### Arguments

| Arg          | Type     | Defaults |
| ------------ | -------- | -------- |
| `jsonObject` | `object` |          |

### Return

| Type     |
| -------- |
| `string` |

## Type declarations

```ts
export function prettyJSONObject(jsonObject: Record<string, any>) {
  return JSON.stringify(jsonObject, null, 2)
}
```
