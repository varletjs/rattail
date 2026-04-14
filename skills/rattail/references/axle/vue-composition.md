---
category: Vue
---

# Vue: `createUseAxle` and composables

**`createUseAxle({ axle, immediate?, ... })`** returns a **`useAxle`** function used inside Vue 3 setup to bind requests to **`ref`** state: loading, error, upload/download progress, caching, polling, and optional **`onTransform` / `onSuccess` / `onError`** lifecycle hooks.

## Documentation

- [README — Vue Composition API](https://github.com/varletjs/axle/blob/main/packages/axle/README.md#L281-L365)
- [README — Parallel utils](https://github.com/varletjs/axle/blob/main/packages/axle/README.md#L367-L417)
- [Source — `use.ts`](https://github.com/varletjs/axle/blob/main/packages/axle/src/use.ts)

## Imports

```ts
import { createUseAxle, useValues, useHasLoading, useAverageProgress } from 'rattail/axle/use'
```

- **`useValues`**: aggregate multiple `useAxle` refs.
- **`useHasLoading`**: whether any of the given requests is loading.
- **`useAverageProgress`**: average upload/download progress across requests.

## Type sketch

```ts
export function createUseAxle(options: CreateUseAxleOptions): UseAxle

// UseAxle returns [value, run, extra] — see UseAxleInstance, Run, UseAxleOptions in use.ts
```
