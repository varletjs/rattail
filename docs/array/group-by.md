# groupBy

Group the elements in a given `array`, and the return value of the passed function will be used as the key of the group.

### Usage

```ts
import { groupBy } from 'rattail'

groupBy([1, 2, 3, 4, 5], (num) => (num % 2 === 0 ? 'even' : 'odd'))
// return { odd: [1, 3, 5], even: [2, 4] }
groupBy(
  [
    { name: 'a', gender: 'female' },
    { name: 'b', gender: 'female' },
    { name: 'c', gender: 'male' },
  ],
  (val) => val.gender,
)
// return {
//   female: [
//     { name: 'a', gender: 'female' },
//     { name: 'b', gender: 'female' },
//   ],
//   male: [{ name: 'c', gender: 'male' }],
// }
```

### Arguments

| Arg   | Type                | Defaults |
| ----- | ------------------- | -------- |
| `arr` | `Array`             |          |
| `fn`  | `(val: any) => any` |          |

### Return

| Type     |
| -------- |
| `object` |
