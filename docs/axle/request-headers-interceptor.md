# Custom Headers Interceptor

Used to customize request headers.

### Import

```ts
import { requestHeadersInterceptor } from 'rattail/axle'
```

### Static Headers

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

### Dynamic Headers

Use a getter function to generate headers dynamically on each request, useful for values like auth tokens.

```ts
axle.useRequestInterceptor(
  requestHeadersInterceptor({
    headers: () => ({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Accept-Language': localStorage.getItem('lang') || 'en',
    }),
  }),
)
```
