# isDataView

Determine whether the input value is a `DataView`.

### Usage

```ts
import { isDataView } from 'rattail'

isDataView(new DataView(new ArrayBuffer(1))) // return true
```

### Arguments

| Arg     | Type  | Defaults |
| ------- | :---: | -------: |
| `value` | `any` |          |

### Return

|   Type    |
| :-------: |
| `boolean` |
