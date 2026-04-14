# Interceptors

Axle provides practical request/response interceptors, compatible with both `axle` and `axios`.

### Import

```ts
import {
  requestHeadersInterceptor,
  requestMockInterceptor,
  requestMd5Interceptor,
  responseRetryInterceptor,
  responseStatusInterceptor,
  responseBlobInterceptor,
} from 'rattail/axle'
```

### Usage with Axle

```ts
axle.useRequestInterceptor(
  requestHeadersInterceptor({
    headers: () => ({
      token: localStorage.getItem('token'),
    }),
  }),
)

axle.useResponseInterceptor(responseRetryInterceptor({ count: 3 }))
```

### Usage with Axios

```ts
const {
  onFulfilled,
  onRejected,
  options,
} = responseRetryInterceptor({ count: 3 })

axios.interceptors.response.use(onFulfilled, onRejected, options)
```

### General Parameters

All built-in interceptors accept these common options:

| Parameter | Description | Type |
| --- | --- | --- |
| `include` | Only apply the interceptor to matching requests | `FilterPattern[]` |
| `exclude` | Skip the interceptor for matching requests | `FilterPattern[]` |
| `axiosInterceptorOptions` | Options passed to axios interceptor registration | `object` |

### include & exclude

Each built-in interceptor supports `include` and `exclude` for request filtering. The following patterns are supported:

- `method:xxx` — match by HTTP method (e.g. `method:get`, `method:post`)
- Glob syntax — match by URL pattern (e.g. `/user/**`, `/system/*`)
- `status:xxx` — match by response status code (e.g. `status:500`, `status:401`)
- Function — custom matching logic `(config) => boolean`

```ts
axle.useResponseInterceptor(
  responseRetryInterceptor({
    count: 3,
    include: ['method:put', 'method:post', 'status:500'],
    exclude: ['/system/**', '/user/addUser', 'status:400'],
  }),
)
```

### Built-in Interceptor List

| Name | Description |
| --- | --- |
| [requestHeadersInterceptor](./request-headers-interceptor) | Customize request headers |
| [requestMockInterceptor](./request-mock-interceptor) | Mock data |
| [requestMd5Interceptor](./request-md5-interceptor) | Compute MD5 hash for parameters and headers |
| [responseRetryInterceptor](./response-retry-interceptor) | Request retry on failure |
| [responseStatusInterceptor](./response-status-interceptor) | Intercept by status code |
| [responseBlobInterceptor](./response-blob-interceptor) | Intercept blob responses |
