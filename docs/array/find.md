# find

Finds the `first` or `last` element in an array that meets a specified condition, returning the element and its index.

### Usage

```ts
import { find } from 'rattail'

find(['a', 'b', 'c'], (item) => item === 'a') 
// return ['a', 0]
find(['a', 'b', 'a'], (item) => item === 'a', 'end') 
// return ['a', 2]
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
