---
category: String
---

# randomString

Generate a random alphanumeric string of a specified length.

## Documentation

- [English](https://rattail.varletjs.org/string/random-string)
- [Chinese docs](https://rattail.varletjs.org/zh/string/random-string)

### Usage

```ts
import { randomString } from 'rattail'

randomString() // Generates a random string of length 10
randomString(30) // Generates a random string of length 30
```

### Arguments

| Arg      |   Type   | Defaults |
| -------- | :------: | -------: |
| `length` | `number` |     `10` |

### Return

|   Type   |
| :------: |
| `string` |

## Type declarations

```ts
export function randomString(length = 10) {
  let str = baseRandomString()

  while (str.length < length) {
    str += baseRandomString()
  }

  function baseRandomString() {
    return Math.random().toString(36).slice(2)
  }

  return str.slice(0, length)
}
```
