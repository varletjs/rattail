---
category: String
---

# kebabCase

Convert a string to `kebab-case`.

## Documentation

- [English](https://rattail.varletjs.org/string/kebab-case)
- [Chinese docs](https://rattail.varletjs.org/zh/string/kebab-case)

### Usage

```ts
import { kebabCase } from 'rattail'

kebabCase('HelloWorld') // return 'hello-world'
kebabCase('fooBar') // return 'foo-bar'
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
export function kebabCase(s: string): string {
  const ret = s
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_\s]+/g, '-')
    .trim()
  return ret.replace(/^-/, '').toLowerCase()
}
```
