# uuid

UUID generation helpers integrated with [uuid](https://github.com/uuidjs/uuid).

Only `v4` and `v6` are exposed by Rattail:

- `uuid`: maps to `uuid.v4`
- `uuidV6`: maps to `uuid.v6`

### Usage

```ts
import { uuid, uuidV6 } from 'rattail'

const id = uuid()
const sortableId = uuidV6()

console.log(id, sortableId)
```

### API

- `uuid(): string`
- `uuidV6(): string`
