---
category: Util
---

# classes

Generates a list of class names based on a given condition or directly returns class names.

## Documentation

- [English](https://rattail.varletjs.org/util/classes)
- [Chinese docs](https://rattail.varletjs.org/zh/util/classes)

### Usage

```ts
import { classes } from 'rattail'

classes('a', [true, 'b', 'c'])
// return ['a', 'b']
classes('a', [false, 'b', 'c'])
// return ['a', 'c']
```

### Arguments

| Arg       | Type              | Defaults |
| --------- | ----------------- | -------- |
| `...args` | `string \| Array` |          |

### Return

| Type    |
| ------- |
| `any[]` |

## Type declarations

```ts
import { isArray } from '../general'

export type ClassName = string | undefined | null

export type Classes = (ClassName | [any, ClassName, ClassName?])[]

export function classes(...classes: Classes): any[] {
  return classes.map((className) => {
    if (isArray(className)) {
      const [condition, truthy, falsy = null] = className
      return condition ? truthy : falsy
    }

    return className
  })
}
```
