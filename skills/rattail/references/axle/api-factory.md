---
category: Vue
---

# API factory: `createApi`

**`createApi(axle, useAxle)`** returns a function **`api(url, method)`** that describes one endpoint: **`load`**, reactive **`use`**, and **`patchUrl`** for `:param` placeholders.

## Documentation

- [API Definition](https://axle.varletjs.org/guide/api-definition)
- [Source — `api.ts`](https://github.com/varletjs/axle/blob/main/src/api.ts)

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
- **`use`** accepts the same options as `useAxle`, such as watch, transform, `abortPrevious` and polling (see [vue-composition.md](vue-composition.md)).
