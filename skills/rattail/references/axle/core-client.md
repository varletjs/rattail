---
category: Core
---

# Core client: `createAxle` and `AxleInstance`

`createAxle(config?)` builds an **`AxleInstance`**: a thin wrapper around `axios.create(config)` with opinionated **runner** methods (JSON, blob, multipart, etc.) and helper APIs for headers and interceptors.

## Documentation

- [README — QuickStart & config](https://github.com/varletjs/axle/blob/main/packages/axle/README.md#L8-L76)
- [Source — `instance.ts`](https://github.com/varletjs/axle/blob/main/packages/axle/src/instance.ts)

## Key points

- **`axle.axios`**: the underlying `AxiosInstance`; use `axios.defaults`, `interceptors`, etc. as with plain axios.
- **`AxleRequestConfig`**: extends axios config with optional **`extra`** for custom metadata.
- **`setHeader` / `removeHeader` / `getHeaders`**: operate on `defaults.headers.common`.
- **`useRequestInterceptor` / `useResponseInterceptor`**: register multiple interceptors in one call (wrapping `axios` interceptors).

## Type declarations (excerpt)

```ts
export function createAxle(config?: AxleRequestConfig): AxleInstance

export interface AxleInstance {
  get: FetchRunner
  post: ModifyRunner
  postUrlEncode: ModifyRunner
  postMultipart: ModifyRunner
  // … head, options, delete, put, patch + *Blob, *Text, …
  getHeaders(): HeadersDefaults['common']
  setHeader(key: string, value: string | number | boolean): void
  removeHeader(key: string | string[]): void
  useRequestInterceptor(...interceptors: RequestInterceptor[]): void
  useResponseInterceptor(...interceptors: ResponseInterceptor[]): void
  axios: AxiosInstance
}
```

See [request-runners.md](request-runners.md) for runner naming and parameters.
