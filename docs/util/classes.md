# classes

Generates a list of class names based on a given condition or directly returns class names.

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
