---
category: Vue
---

# Vue: `createUseAxle`

**`createUseAxle({ axle, ... })`** returns a **`useAxle`** function used inside Vue 3 setup to bind a request to **`ref`** state: value, loading, error, upload/download progress, caching, polling, aborting, and the **`onBefore` / `onTransform` / `onSuccess` / `onError` / `onAfter`** lifecycle hooks.

## Documentation

- [Vue Composition API](https://axle.varletjs.org/guide/composition-api) · [Chinese docs](https://axle.varletjs.org/zh/guide/composition-api)
- [Source — `use.ts`](https://github.com/varletjs/axle/blob/main/src/use.ts)

## Imports

```ts
import { createUseAxle } from 'rattail/axle/use'
```

## Usage

```ts
import { createAxle } from 'rattail/axle'
import { createUseAxle } from 'rattail/axle/use'

const axle = createAxle()

const useAxle = createUseAxle({
  axle,
  // defaults for every useAxle, each can be overridden per call
  immediate: false,
  abortPrevious: true,
  pollingSilent: true,
  onTransform: (response) => response,
})

const [users, getUsers, { loading, error, abort, resetValue }] = useAxle({
  value: [],
  method: 'get',
  url: '/user',
  params: () => ({ current: 1, pageSize: 10 }),
  watch: true,
  onTransform: (response) => response.data,
})
```

`useAxle` returns `[value, run, extra]`. The `run` function also carries every `extra` property, so `getUsers.loading.value` works without destructuring the third item.

`watch: true` re-runs the request when reactive `params` / `config` change. Pass `{ params: true }` or `{ config: true }` to watch only one of them.

## Abort previous

With `abortPrevious` enabled, calling `run` while a previous run is still pending aborts the previous request. Only the latest run updates `value`, `loading` and `error` and triggers the lifecycle hooks; the aborted run rejects with the abort error. Set it on `createUseAxle` as the default, or per `useAxle`.

```ts
const [users, getUsers] = useAxle({ method: 'get', url: '/user', abortPrevious: true })
```

## Silent run

Pass `silent: true` to refresh data without setting `loading`, e.g. for background refreshes.

```ts
getUsers({ silent: true })
```

## Polling

With `pollingInterval`, every finished run schedules another run after the interval. With `pollingSilent` enabled, runs triggered by polling don't set `loading`. Stop polling manually with `cancelPolling()`; `pollingCanceled` reflects the state.

`pollingInterval` can also be a getter. Returning `null` or `undefined` stops polling, and when the reactive data read by the getter changes, the next poll is rescheduled.

```ts
const [task, getTask] = useAxle({
  method: 'get',
  url: '/task',
  pollingInterval: () => (task.value?.status === 'pending' ? 2000 : null),
  pollingSilent: true,
})
```

## Type declarations

```ts
export interface RunOptions<V, P, D> {
  url?: string
  params?: P
  config?: AxleRequestConfig<D>
  resetValue?: boolean
  cloneResetValue?: boolean | ((value: V) => V)
  silent?: boolean
}

export type UseAxleExtra<V> = {
  loading: Ref<boolean>
  error: Ref<Error | undefined>
  uploadProgress: Ref<number>
  downloadProgress: Ref<number>
  pollingCanceled: Ref<boolean>
  abort(): void
  resetValue(options?: ResetValueOptions<V>): void
  invalidateCache(): void
  cancelPolling(): void
}

export interface UseAxleRefs<V> {
  value: Ref<V>
  loading: Ref<boolean>
  error: Ref<Error | undefined>
  uploadProgress: Ref<number>
  downloadProgress: Ref<number>
  pollingCanceled: Ref<boolean>
}

export type Run<V, R, P, D> = {
  (options?: RunOptions<V, P, D>): Promise<R>
} & UseAxleExtra<V>

export type WatchOptions =
  | boolean
  | {
      params?: boolean
      config?: boolean
      _custom?: () => any
    }
export interface UseAxleOptions<V = any, R = any, P = Record<string, any>, D = Record<string, any>> {
  url: string | (() => string)
  method: RunnerMethod
  value?: V
  immediate?: boolean
  resetValue?: boolean
  cloneResetValue?: boolean | ((value: V) => V)
  abortOnUnmount?: boolean
  abortPrevious?: boolean
  cacheKey?: string | (() => string)
  cacheTime?: number
  config?: AxleRequestConfig<D> | (() => AxleRequestConfig<D>)
  watch?: WatchOptions
  pollingInterval?: number | (() => number | null | undefined)
  pollingSilent?: boolean
  pollingOnHidden?: boolean
  pollingOnDeactivated?: boolean
  refreshOnWindowFocus?: boolean
  params?: P | (() => P)
  onBefore?(refs: UseAxleRefs<V>): void
  onAfter?(refs: UseAxleRefs<V>): void
  onTransform?(response: R, refs: UseAxleRefs<V>): V | Promise<V>
  onSuccess?(response: R, refs: UseAxleRefs<V>): void
  onError?(error: Error, refs: UseAxleRefs<V>): void
}

export interface ResetValueOptions<V> {
  cloneResetValue?: boolean | ((value: V) => V)
}

export type UseAxleInstance<V, R, P, D> = [value: Ref<V>, run: Run<V, R, P, D>, extra: UseAxleExtra<V>]

export interface CreateUseAxleOptions {
  axle: AxleInstance
  immediate?: boolean
  abortOnUnmount?: boolean
  abortPrevious?: boolean
  pollingSilent?: boolean
  cacheTime?: number
  onTransform?(response: any, refs: any): any
}

export type UseAxleOptionsWithRunnable<
  V = any,
  R = any,
  P = Record<string, any>,
  D = Record<string, any>,
> = UseAxleOptions<V, R, P, D> & { runnable: Runnable }
export interface UseAxle {
  <V = any, R = any, P = Record<string, any>, D = Record<string, any>>(
    options: UseAxleOptionsWithRunnable<V, R, P, D>,
  ): UseAxleInstance<V, R | undefined, P, D>

  <V = any, R = any, P = Record<string, any>, D = Record<string, any>>(
    options: UseAxleOptions<V, R, P, D>,
  ): UseAxleInstance<V, R, P, D>
}
```
