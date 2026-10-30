---
category: Object
---

# stringifyStableJSON

## Documentation

- [English](https://rattail.varletjs.org/object/stringify-stable-json)
- [Chinese docs](https://rattail.varletjs.org/zh/object/stringify-stable-json)

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

| Argument | Type      | Description            |
| -------- | --------- | ---------------------- |
| `value`  | `unknown` | The value to serialize |

### Return

`string | undefined`, following the native top-level JSON serialization behavior.

### Notes

- Object keys are sorted lexicographically as strings, including integer-like keys.
- Other serialization behavior follows `JSON.stringify`, including `toJSON` and errors for circular references or unsupported `BigInt` values.

## Type declarations

```ts
export function stringifyStableJSON(value: unknown): string | undefined {
  const serialized = JSON.stringify(value)

  if (serialized === undefined || (serialized[0] !== '[' && serialized[0] !== '{')) {
    return serialized
  }

  const tokens = serialized.match(/"(?:[^"\\]|\\.)*"|[{}[\],:]|[^\s{}[\],:"]+/g) ?? []
  let index = 0

  return stringifyJsonValue()

  function stringifyJsonValue(): string {
    const token = tokens[index++]

    if (token === '[') {
      const items: string[] = []

      while (tokens[index] !== ']') {
        items.push(stringifyJsonValue())

        if (tokens[index] === ',') {
          index += 1
        }
      }

      index += 1

      return `[${items.join(',')}]`
    }

    if (token === '{') {
      const entries: [string, string][] = []

      while (tokens[index] !== '}') {
        const keyToken = tokens[index++]
        const key: string = JSON.parse(keyToken)
        index += 1
        entries.push([key, `${keyToken}:${stringifyJsonValue()}`])

        if (tokens[index] === ',') {
          index += 1
        }
      }

      index += 1
      entries.sort(([first], [second]) => (first < second ? -1 : first > second ? 1 : 0))

      return `{${entries.map((entry) => entry[1]).join(',')}}`
    }

    return token
  }
}
```
