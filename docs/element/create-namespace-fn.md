# createNamespaceFn

Creates a namespace function that allows BEM-style naming of components and classes.

### Usage

```ts
import { createNamespaceFn } from 'rattail'

const ns = createNamespaceFn('my-app')
const bem = ns('button')
console.log(bem.n('--active'))
```

### Arguments

| Arg         | Type     | Defaults |
| ----------- | -------- | -------- |
| `namespace` | `string` |          |

### Return

| Type                                               |
| -------------------------------------------------- |
| `{ name: string; n: Function; classes: Function }` |
