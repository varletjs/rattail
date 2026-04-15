# Blob Interceptor

Used to intercept blob-type responses. When the response `responseType` is `blob`, the `onResponse` callback is invoked to transform the response, e.g., wrapping the blob data into a unified response structure.

### Import

```ts
import { responseBlobInterceptor } from 'rattail/axle'
```

### Usage

```ts
axle.useResponseInterceptor(
  responseBlobInterceptor({
    onResponse: (response) => ({
      ...response,
      data: {
        code: 200,
        data: response.data,
        message: 'success',
      },
    }),
  }),
)
```

### Options

| Option | Type | Description |
| --- | --- | --- |
| `onResponse` | `(response) => any` | Transform callback for blob responses |
