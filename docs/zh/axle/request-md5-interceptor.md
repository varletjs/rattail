# 拦截 - MD5 计算

用于对请求参数和请求头进行 MD5 计算。

### 引入

```ts
import { requestMd5Interceptor } from 'rattail/axle'
```

### 用法

```ts
axle.useRequestInterceptor(
  requestMd5Interceptor({
    mappings: [
      {
        url: '/user',
        method: 'post',
        path: ['name', 'password'],
      },
      {
        url: (url) => url.startsWith('/secure'),
        method: 'put',
        path: ['token'],
      },
    ],
  }),
)
```

### 映射选项

| 选项 | 类型 | 描述 |
| --- | --- | --- |
| `url` | `string \| ((url: string) => boolean)` | 匹配的 URL |
| `method` | `string` | 匹配的 HTTP 方法 |
| `path` | `string[]` | 需要 MD5 计算的字段 |
