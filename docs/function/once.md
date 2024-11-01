# once

Creates a function that will only execute once. Subsequent calls return the result of the first invocation.

### Usage

```ts
import { once } from 'rattail'

const fn = once(() => 'initialized')
fn() // return 'initialized'
fn() // return 'initialized'
```

### Arguments

| Arg  |    Type    | Defaults |
| ---- | :--------: | -------: |
| `fn` | `Function` |          |

### Return

|    Type    |
| :--------: |
| `Function` |
