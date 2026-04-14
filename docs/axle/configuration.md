# Configuration

Axle fully supports all axios configuration. You can access the built-in axios instance via `axle.axios` to configure defaults, headers, timeouts, and interceptors.

### Access Axios Instance

```ts
import { createAxle } from 'rattail/axle'

const axle = createAxle({ baseURL: '/api' })

const axios = axle.axios
```

### Configure Defaults

```ts
axios.defaults.timeout = 10000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
```

### Configure Headers

```ts
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
axios.defaults.headers.post['Content-Type'] = 'application/json'
```

### Custom Interceptors via Axios

In addition to Axle's built-in interceptors, you can register interceptors directly on the axios instance.

```ts
axios.interceptors.request.use(
  (config) => {
    config.headers['X-Timestamp'] = Date.now().toString()
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
```
