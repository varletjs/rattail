# 拦截器

Axle 提供了实用的请求/响应拦截器，兼容 `axle` 和 `axios`。

### 引入

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

### 在 Axle 中使用

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

### 在 Axios 中使用

```ts
const {
  onFulfilled,
  onRejected,
  options,
} = responseRetryInterceptor({ count: 3 })

axios.interceptors.response.use(onFulfilled, onRejected, options)
```

### 通用参数

所有内置拦截器接受以下公共选项：

| 参数 | 描述 | 类型 |
| --- | --- | --- |
| `include` | 仅对匹配的请求应用拦截器 | `FilterPattern[]` |
| `exclude` | 跳过匹配的请求 | `FilterPattern[]` |
| `axiosInterceptorOptions` | 传递给 axios 拦截器注册的选项 | `object` |

### include & exclude

每个内置拦截器都支持 `include` 和 `exclude` 进行请求过滤，支持以下模式：

- `method:xxx` — 按 HTTP 方法匹配（如 `method:get`、`method:post`）
- Glob 语法 — 按 URL 模式匹配（如 `/user/**`、`/system/*`）
- `status:xxx` — 按响应状态码匹配（如 `status:500`、`status:401`）
- 函数 — 自定义匹配逻辑 `(config) => boolean`

```ts
axle.useResponseInterceptor(
  responseRetryInterceptor({
    count: 3,
    include: ['method:put', 'method:post', 'status:500'],
    exclude: ['/system/**', '/user/addUser', 'status:400'],
  }),
)
```

### 内置拦截器列表

| 名称 | 描述 |
| --- | --- |
| [requestHeadersInterceptor](./request-headers-interceptor) | 自定义请求头 |
| [requestMockInterceptor](./request-mock-interceptor) | 模拟数据 |
| [requestMd5Interceptor](./request-md5-interceptor) | 对参数和请求头进行 MD5 计算 |
| [responseRetryInterceptor](./response-retry-interceptor) | 请求失败重试 |
| [responseStatusInterceptor](./response-status-interceptor) | 按状态码拦截 |
| [responseBlobInterceptor](./response-blob-interceptor) | 拦截 Blob 响应 |
