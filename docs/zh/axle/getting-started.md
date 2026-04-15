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

`createAxle` 支持所有 [axios 配置](https://axios-http.com/) 选项。

### 基本用法

```ts
axle.get('/user', { current: 1, pageSize: 10 })

axle.post('/user', { name: 'Axle' })
```

### 组合式 API

```ts
import { createUseAxle } from 'rattail/axle/use'

const useAxle = createUseAxle({ axle })

const [users, getUsers] = useAxle({
  method: 'get',
  url: '/user',
})
```
