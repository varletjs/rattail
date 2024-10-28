# randomNumber

Generate a random integer between `min` and `max`, inclusive. If no values are provided, it defaults to a range of `0` to `100`.

### Usage

```ts
import { randomNumber } from 'rattail'

randomNumber(1, 10) // return a random integer between 1 and 10
randomNumber() // return 0 or 100 (default range)
```

### Arguments

| Arg   |   Type   | Defaults |
| ----- | :------: | -------: |
| `min` | `number` |      `0` |
| `max` | `number` |    `100` |

### Return

|   Type   |
| :------: |
| `number` |
