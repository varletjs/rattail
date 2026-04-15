# 拦截 - 失败重试

用于请求失败时自动重试。

### 引入

```ts
import { responseRetryInterceptor } from 'rattail/axle'
```

### 用法

```ts
axle.useResponseInterceptor(
  responseRetryInterceptor({
    count: 3,
  }),
)
```

### 选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `count` | `number` | - | 最大重试次数 |
