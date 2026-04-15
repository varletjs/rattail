# 快速开始

Axle 是一个基于 [axios](https://axios-http.com/) 的渐进式请求工具，不会破坏 axios 原有的能力，帮助您更轻松地处理请求。

### 引入

```ts
import { createAxle } from 'rattail/axle'
```

### 创建实例

```ts
const axle = createAxle({
  baseURL: '/api',
})
```

`createAxle` 接收所有 [axios 配置](https://axios-http.com/) 选项。

### 参数归一化

Axle 归一化了请求函数的参数。对于 `GET` 请求，第二个参数为 `params`；对于 `POST/PUT/PATCH`，第二个参数为 `data`。第三个参数始终为 axios 配置。

```ts
axle.get('/url', { current: 1, pageSize: 10 }, { headers: {} })

axle.post('/url', { name: 'Axle' }, { headers: {} })

axle.put('/url', { id: 1, name: 'Axle' }, { headers: {} })

axle.delete('/url', { id: 1 }, { headers: {} })

axle.patch('/url', { name: 'Axle' }, { headers: {} })

axle.head('/url', { current: 1 }, { headers: {} })

axle.options('/url', { current: 1 }, { headers: {} })
```

### 访问 Axios 实例

```ts
axle.axios
```
