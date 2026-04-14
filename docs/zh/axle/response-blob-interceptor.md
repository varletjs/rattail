# responseBlobInterceptor

用于拦截 blob 类型的响应。当响应的 `responseType` 为 `blob` 时，通过 `onResponse` 回调对响应进行转换，例如将 blob 数据包装为统一的响应结构。

### 引入

```ts
import { responseBlobInterceptor } from 'rattail/axle'
```

### 用法

```ts
axle.useResponseInterceptor(
  responseBlobInterceptor({
    onResponse: (response) => ({
      ...response,
      data: {
        code: 200,
        data: response.data,
        message: 'success',
      },
    }),
  }),
)
```

### 选项

| 选项 | 类型 | 描述 |
| --- | --- | --- |
| `onResponse` | `(response) => any` | blob 响应的转换回调 |
