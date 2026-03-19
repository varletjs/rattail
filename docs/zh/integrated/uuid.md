# uuid

UUID 生成能力，集成自 [uuid](https://github.com/uuidjs/uuid)。

Rattail 只导出了 `v4` 和 `v6`：

- `uuid`：对应 `uuid.v4`
- `uuidV6`：对应 `uuid.v6`

### 使用

```ts
import { uuid, uuidV6 } from 'rattail'

const id = uuid()
const sortableId = uuidV6()

console.log(id, sortableId)
```

### API

- `uuid(): string`
- `uuidV6(): string`
