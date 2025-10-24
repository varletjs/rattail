# objectKeys

Get an array of keys from an object, with full TypeScript type support.

### Usage

```ts
import { objectKeys } from 'rattail'

const obj = { a: 1, b: 2 }
const keys = objectKeys(obj)
// keys = ['a', 'b']
```

### Arguments

| Arg      | Type     |
| -------- | -------- |
| `object` | `object` |

### Return

| Type            |
| --------------- |
| `Array<string>` |

### Notes

- The return value is fully type-safe for the input object.
- Similar to `Object.keys`, but with better TypeScript support.
