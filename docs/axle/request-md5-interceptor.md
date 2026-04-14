# requestMd5Interceptor

Used to compute MD5 hashes for request parameters and headers.

### Import

```ts
import { requestMd5Interceptor } from 'rattail/axle'
```

### Usage

```ts
axle.useRequestInterceptor(
  requestMd5Interceptor({
    mappings: [
      {
        url: '/user',
        method: 'post',
        path: ['name', 'password'],
      },
      {
        url: (url) => url.startsWith('/secure'),
        method: 'put',
        path: ['token'],
      },
    ],
  }),
)
```

### Mapping Options

| Option | Type | Description |
| --- | --- | --- |
| `url` | `string \| ((url: string) => boolean)` | URL to match |
| `method` | `string` | HTTP method to match |
| `path` | `string[]` | Fields to compute MD5 hash for |
