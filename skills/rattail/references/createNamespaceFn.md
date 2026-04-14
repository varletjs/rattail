---
category: Util
---

# createNamespaceFn

Creates a namespace function that allows BEM-style naming of components and classes.

## Documentation

- [English](https://rattail.varletjs.org/util/create-namespace-fn)
- [Chinese docs](https://rattail.varletjs.org/zh/util/create-namespace-fn)

### Usage

```ts
import { createNamespaceFn } from 'rattail'

const createNamespace = createNamespaceFn('var')
const { name, n, classes } = createNamespace('button')
// name: 'VarButton'; `classes` matches rattail's `classes` helper

n() // return 'var-button'
n('$-box') // return 'var-box'
n('element') // return 'var-button__element'
n('--modifier') // return 'var-button--modifier'
```

### Arguments

| Arg         | Type     | Defaults |
| ----------- | -------- | -------- |
| `namespace` | `string` |          |

### Return

| Type                                               |
| -------------------------------------------------- |
| `{ name: string; n: Function; classes: Function }` |

## Type declarations

```ts
import { pascalCase } from '../string'
import { classes } from './classes'

export type BEM<S extends string | undefined, N extends string, NC extends string> = S extends undefined
  ? NC
  : S extends `$--${infer CM}`
    ? `${N}--${CM}`
    : S extends `--${infer M}`
      ? `${NC}--${M}`
      : `${NC}__${S}`

export function createNamespaceFn<N extends string>(namespace: N) {
  return <C extends string>(name: C) => {
    const componentName = `${namespace}-${name}` as const

    const createBEM = <S extends string | undefined = undefined>(
      suffix?: S,
    ): BEM<S, typeof namespace, typeof componentName> => {
      if (!suffix) {
        return componentName as any
      }

      if (suffix[0] === '$') {
        return suffix.replace('$', namespace) as any
      }

      return (suffix.startsWith('--') ? `${componentName}${suffix}` : `${componentName}__${suffix}`) as any
    }

    return {
      name: pascalCase(componentName),
      n: createBEM,
      classes,
    }
  }
}
```
