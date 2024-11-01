# createNamespaceFn

Creates a namespace function that allows BEM-style naming of components and classes.

### Usage

```ts
import { createNamespaceFn } from 'rattail'

const createNamespace = createNamespaceFn('var')
const { name, n, classes } = createNamespace('button')
// name: 'VarButton', classes 与 rattail 提供的 classes 一致

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
