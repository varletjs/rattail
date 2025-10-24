# objectEntries

Get an array of key-value pairs from an object, with full TypeScript type support.

### Usage

```ts
import { objectEntries } from 'rattail'

const obj = { a: 1, b: 2 }
const entries = objectEntries(obj)
// entries = [['a', 1], ['b', 2]]
```

### Arguments

| Arg      | Type     |
| -------- | -------- |
| `object` | `object` |

### Return

| Type                   |
| ---------------------- |
| `Array<[string, any]>` |

### Notes

- The return value is fully type-safe for the input object.
- Similar to `Object.entries`, but with better TypeScript support.
