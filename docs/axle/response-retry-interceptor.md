# Retry Interceptor

Used for automatic request retry on failure.

### Import

```ts
import { responseRetryInterceptor } from 'rattail/axle'
```

### Usage

```ts
axle.useResponseInterceptor(
  responseRetryInterceptor({
    count: 3,
  }),
)
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number` | - | Maximum number of retry attempts |
