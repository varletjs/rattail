# Utilities

Axle provides several utility functions for common tasks.

### Download File

Trigger a browser file download from a Blob.

```ts
import { download } from 'rattail/axle'

const blob = await axle.getBlob('/file/export', { id: 1 })
download(blob, 'report.xlsx')
```

### Error Handling

Use `withResponse` to handle promise results without try/catch. Returns a tuple of `[response, error]`.

```ts
import { withResponse } from 'rattail/axle'

const [response, error] = await withResponse(axle.get('/user'))

if (error) {
  console.error('Request failed:', error)
} else {
  console.log('Data:', response)
}
```

### Header Operations

Convenient methods for managing request headers on the axle instance.

```ts
axle.getHeaders()
axle.setHeader('Authorization', `Bearer ${token}`)
axle.removeHeader('Authorization')
```
