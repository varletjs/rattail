# prettyJSONObject

Formats a `JSON` object with indentation for easy readability.

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
