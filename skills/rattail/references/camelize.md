---
category: String
---

# camelize

Convert a string to `camelCase`.

## Documentation

- [English](https://rattail.varletjs.org/string/camelize)
- [Chinese docs](https://rattail.varletjs.org/zh/string/camelize)

### Usage

```ts
import { camelize } from 'rattail'

camelize('hello-world') // return 'helloWorld'
camelize('FooBar') // return 'fooBar'
```

### Arguments

| Arg     |   Type   | Defaults |
| ------- | :------: | -------: |
| `value` | `string` |          |

### Return

|   Type   |
| :------: |
| `string` |

## Type declarations

```ts
export function camelize(s: string): string {
  s = s.replace(/[-_](\w)/g, (_: any, p: string) => p.toUpperCase())
  return s.replace(s.charAt(0), s.charAt(0).toLowerCase())
}
```
