# 配置

Axle 完全支持所有 axios 配置。可以通过 `axle.axios` 访问内置的 axios 实例，配置默认值、请求头、超时和拦截器。

### 访问 Axios 实例

```ts
import { createAxle } from 'rattail/axle'

const axle = createAxle({ baseURL: '/api' })

const axios = axle.axios
```

### 配置默认值

```ts
axios.defaults.timeout = 10000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
```

### 配置请求头

```ts
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
axios.defaults.headers.post['Content-Type'] = 'application/json'
```

### 通过 Axios 自定义拦截器

除了 Axle 的内置拦截器，也可以直接在 axios 实例上注册拦截器。

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
