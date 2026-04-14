# requestMockInterceptor

Used to mock data during development.

### Import

```ts
import { requestMockInterceptor } from 'rattail/axle'
```

### Usage

```ts
axle.useRequestInterceptor(
  requestMockInterceptor({
    mappings: [
      {
        url: '/user',
        method: 'get',
        delay: 300,
        handler: () => ({
          data: {
            code: 200,
            data: [
              { id: '1', name: 'Alice' },
              { id: '2', name: 'Bob' },
            ],
          },
        }),
      },
      {
        url: '/user/:id',
        method: 'get',
        handler: () => ({
          data: { code: 200, data: { id: '1', name: 'Alice' } },
        }),
      },
      {
        url: '/user',
        method: 'post',
        delay: 500,
        handler: () => ({
          data: { code: 200, message: 'Created' },
          status: 201,
        }),
      },
    ],
  }),
)
```

### Mapping Options

| Option | Type | Description |
| --- | --- | --- |
| `url` | `string \| ((url: string) => boolean)` | URL to match, supports `:param` syntax or a function |
| `method` | `string` | HTTP method to match |
| `delay` | `number` | Simulated response delay in ms |
| `handler` | `() => { data: any, status?: number }` | Returns mock response data and optional status code |

### Function URL Matching

```ts
axle.useRequestInterceptor(
  requestMockInterceptor({
    mappings: [
      {
        url: (url) => url.startsWith('/user'),
        method: 'get',
        handler: () => ({
          data: { code: 200, data: [] },
        }),
      },
    ],
  }),
)
```
