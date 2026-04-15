# 拦截 - 状态码处理

用于按 HTTP 状态码拦截和处理响应。与 axios 的默认行为一致，状态码在 `200-299` 范围内视为 valid，其余视为 invalid。

### 引入

```ts
import { responseStatusInterceptor } from 'rattail/axle'
```

### 用法

```ts
axle.useResponseInterceptor(
  responseStatusInterceptor({
    validStatusHandler(response) {
      if (response.status === 200) {
        console.log('请求成功')
      }
    },
    invalidStatusHandler(response) {
      if (response.status === 500) {
        console.error('服务器错误')
      }
    },
  }),
)
```

### 选项

| 选项 | 类型 | 描述 |
| --- | --- | --- |
| `validStatusHandler` | `(response) => void` | 状态码在 `200-299` 范围内时调用 |
| `invalidStatusHandler` | `(response) => void` | 状态码不在 `200-299` 范围内时调用 |
