# assert

Throws an error when the input value is not truthy, the second argument is the error message.

### Usage

```ts
import { assert } from 'rattail'

const count = 99
assert(count < 100, 'error message')
```

### Arguments

| Arg         |   Type   | Defaults |
| ----------- | :------: | -------: |
| `condition` |  `any`   |          |
| `message`   | `string` |          |
