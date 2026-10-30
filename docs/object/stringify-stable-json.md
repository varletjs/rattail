# stringifyStableJSON

Serializes values with recursively sorted object keys, so changing object property insertion order does not change the output. Useful for cache keys and content fingerprints. Arrays retain their original order.

### Usage

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

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `value` | `unknown` | The value to serialize |

### Return

`string | undefined`, following the native top-level JSON serialization behavior.

### Notes

- Object keys are sorted lexicographically as strings, including integer-like keys.
- Other serialization behavior follows `JSON.stringify`, including `toJSON` and errors for circular references or unsupported `BigInt` values.
