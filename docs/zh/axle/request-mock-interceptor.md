# requestMockInterceptor

用于在开发阶段模拟数据。

### 引入

```ts
import { requestMockInterceptor } from 'rattail/axle'
```

### 用法

```ts
axle.useRequestInterceptor(
  requestMockInterceptor({
    mappings: [
      {
        url: '/user',
        method: 'get',
        delay: 300,
        handler: () => ({
          data: {
            code: 200,
            data: [
              { id: '1', name: 'Alice' },
              { id: '2', name: 'Bob' },
            ],
          },
        }),
      },
      {
        url: '/user/:id',
        method: 'get',
        handler: () => ({
          data: { code: 200, data: { id: '1', name: 'Alice' } },
        }),
      },
      {
        url: '/user',
        method: 'post',
        delay: 500,
        handler: () => ({
          data: { code: 200, message: 'Created' },
          status: 201,
        }),
      },
    ],
  }),
)
```

### 映射选项

| 选项 | 类型 | 描述 |
| --- | --- | --- |
| `url` | `string \| ((url: string) => boolean)` | 匹配的 URL，支持 `:param` 语法或函数 |
| `method` | `string` | 匹配的 HTTP 方法 |
| `delay` | `number` | 模拟的响应延迟（毫秒） |
| `handler` | `() => { data: any, status?: number }` | 返回模拟响应数据和可选状态码 |

### 函数形式的 URL 匹配

```ts
axle.useRequestInterceptor(
  requestMockInterceptor({
    mappings: [
      {
        url: (url) => url.startsWith('/user'),
        method: 'get',
        handler: () => ({
          data: { code: 200, data: [] },
        }),
      },
    ],
  }),
)
```
