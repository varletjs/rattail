# assert

当输入值不是 `truthy` 时抛出错误，第二个参数是错误信息。

### Usage

```ts
import { assert } from 'rattail'

const count = 99
assert(count < 100, 'error message')
```

### 参数

| 参数        |   类型   | 默认值 |
| ----------- | :------: | -----: |
| `condition` |  `any`   |        |
| `message`   | `string` |        |
