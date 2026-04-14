# Getting Started

Axle is a progressive request tool based on [axios](https://axios-http.com/). It does not destroy the original abilities of axios, and helps you process requests more easily.

Axle is integrated in rattail, no separate installation is needed.

### Import

```ts
import { createAxle } from 'rattail/axle'
```

### Create Instance

```ts
const axle = createAxle({
  baseURL: '/api',
})
```

The `createAxle` function accepts all [axios config](https://axios-http.com/) options.

### Normalized Parameters

Axle normalizes the parameters of request functions. For `GET` requests, the second argument is `params`; for `POST/PUT/PATCH`, the second argument is `data`. The third argument is always axios config.

```ts
axle.get('/url', { current: 1, pageSize: 10 }, { headers: {} })
axle.post('/url', { name: 'Axle' }, { headers: {} })
axle.put('/url', { id: 1, name: 'Axle' }, { headers: {} })
axle.delete('/url', { id: 1 }, { headers: {} })
axle.patch('/url', { name: 'Axle' }, { headers: {} })
axle.head('/url', { current: 1 }, { headers: {} })
axle.options('/url', { current: 1 }, { headers: {} })
```

### Access Axios Instance

```ts
axle.axios
```
