# find

Finds the first or last element in an array that meets a specified condition, returning the element and its index.

### Usage

```ts
import { find } from 'rattail'

find([1, 2, 3], (item) => item > 1) // returns [2, 1]
```

### Arguments

| Arg    | Type                                              | Defaults  |
| ------ | ------------------------------------------------- | --------- |
| `arr`  | `Array`                                           |           |
| `fn`   | `(item: any, index: number, array: Array) => any` |           |
| `from` | `'start' \| 'end'`                                | `'start'` |

### Return

| Type                          |
| ----------------------------- |
| `[any, number] \| [null, -1]` |
