# requestHeadersInterceptor

用于自定义请求头。

### 引入

```ts
import { requestHeadersInterceptor } from 'rattail/axle'
```

### 静态请求头

```ts
axle.useRequestInterceptor(
  requestHeadersInterceptor({
    headers: {
      'X-Custom-Header': 'value',
      'X-App-Version': '1.0.0',
    },
  }),
)
```

### 动态请求头

使用 getter 函数在每次请求时动态生成请求头，适用于认证令牌等场景。

```ts
axle.useRequestInterceptor(
  requestHeadersInterceptor({
    headers: () => ({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Accept-Language': localStorage.getItem('lang') || 'zh',
    }),
  }),
)
```
