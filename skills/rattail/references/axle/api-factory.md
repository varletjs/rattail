---
category: Vue
---

# API factory: `createApi`

**`createApi(axle, useAxle)`** returns a function **`api(url, method)`** that describes one endpoint: **`load`**, reactive **`use`**, and **`patchUrl`** for `:param` placeholders.

## Documentation

- [README — API Definition Enhancement](https://github.com/varletjs/axle/blob/main/packages/axle/README.md#L419-L505)
- [Source — `api.ts`](https://github.com/varletjs/axle/blob/main/packages/axle/src/api.ts)

## Usage (pattern)

```ts
import { createAxle } from 'rattail/axle'
import { createApi } from 'rattail/axle/api'
import { createUseAxle } from 'rattail/axle/use'

const axle = createAxle()
const useAxle = createUseAxle({ axle })
const api = createApi(axle, useAxle)

const getUser = api('/user/:id', 'get')
await getUser.load(undefined, { id: '1' })
const [user] = getUser.use({ pathParams: { id: '1' } })
```

- **`pathParams`**: object or getter; replaces `:key` segments in `url`.
- **`use`** accepts the same watch / transform options as `useAxle` (see [vue-composition.md](vue-composition.md)).
