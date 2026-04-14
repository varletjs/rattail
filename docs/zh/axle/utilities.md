# 实用工具

Axle 提供了一些常用任务的实用函数。

### 下载文件

从 Blob 触发浏览器文件下载。

```ts
import { download } from 'rattail/axle'

const blob = await axle.getBlob('/file/export', { id: 1 })
download(blob, 'report.xlsx')
```

### 错误处理

使用 `withResponse` 处理 Promise 结果，无需 try/catch。返回 `[response, error]` 元组。

```ts
import { withResponse } from 'rattail/axle'

const [response, error] = await withResponse(axle.get('/user'))

if (error) {
  console.error('请求失败:', error)
} else {
  console.log('数据:', response)
}
```

### 请求头操作

在 axle 实例上便捷地管理请求头。

```ts
axle.getHeaders()
axle.setHeader('Authorization', `Bearer ${token}`)
axle.removeHeader('Authorization')
```
