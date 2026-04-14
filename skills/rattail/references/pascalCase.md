---
category: String
---

# pascalCase

pascalCase

## Documentation

- [English](https://rattail.varletjs.org/string/pascal-case)
- [Chinese docs](https://rattail.varletjs.org/zh/string/pascal-case)

Convert a string to `PascalCase`.

### Usage

```ts
import { pascalCase } from 'rattail'

pascalCase('hello-world') // return 'HelloWorld'
pascalCase('fooBar') // return 'FooBar'
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
import { camelize } from './camelize'

export function pascalCase(s: string): string {
  const ret = camelize(s)
  return ret.replace(ret.charAt(0), ret.charAt(0).toUpperCase())
}
```
