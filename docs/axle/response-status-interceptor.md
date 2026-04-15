# Status Interceptor

Used to intercept and handle responses based on HTTP status codes. Consistent with axios default behavior, status codes in the `200-299` range are considered valid, and all others are considered invalid.

### Import

```ts
import { responseStatusInterceptor } from 'rattail/axle'
```

### Usage

```ts
axle.useResponseInterceptor(
  responseStatusInterceptor({
    validStatusHandler(response) {
      if (response.status === 200) {
        console.log('Request succeeded')
      }
    },
    invalidStatusHandler(response) {
      if (response.status === 500) {
        console.error('Server error')
      }
    },
  }),
)
```

### Options

| Option | Type | Description |
| --- | --- | --- |
| `validStatusHandler` | `(response) => void` | Called when status code is in `200-299` |
| `invalidStatusHandler` | `(response) => void` | Called when status code is outside `200-299` |
