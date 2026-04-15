# Vue 组合式 API

Axle 提供了 Vue 组合式 API 风格的用法。

### 引入

```ts
import { createUseAxle } from 'rattail/axle/use'
```

### 创建 useAxle

```ts
import { createAxle } from 'rattail/axle'
import { createUseAxle } from 'rattail/axle/use'

const axle = createAxle({ baseURL: '/api' })

const useAxle = createUseAxle({ axle })
```

### 基本用法

```html
<script setup>
const [
  users,
  getUsers,
  { loading, error, uploadProgress, downloadProgress, abort, resetValue },
] = useAxle({
  value: [],

  method: 'get',

  url: '/user',

  immediate: true,

  params: {
    current: 1,
    pageSize: 10,
  },

  config: {
    headers: {},
  },

  onBefore(refs) {
    const { data, loading, error } = refs
    const { uploadProgress, downloadProgress } = refs
  },

  onTransform(response, refs) {
    return response.data
  },

  onSuccess(response, refs) {},

  onError(error, refs) {},

  onAfter(refs) {},
})
</script>

<template>
  <span>{{ loading ? 'loading...' : users }}</span>
  <button @click="getUsers">发送请求</button>
  <button @click="abort">中止请求</button>
</template>
```

### 选项

| 选项 | 描述 | 默认值 |
| --- | --- | --- |
| `value` | 请求初始值 | - |
| `method` | 请求方法 | - |
| `url` | 请求地址，可以是 getter 函数 | - |
| `immediate` | 是否立即发送请求 | `true` |
| `resetValue` | 请求前是否重置值 | `false` |
| `cloneResetValue` | 重置值时的克隆策略。`true` 使用深拷贝，也可传入自定义克隆函数 `(value) => value` | `false` |
| `params` | 请求参数，可以是 getter 函数 | `{}` |
| `config` | Axios 配置，可以是 getter 函数 | `{}` |
| `onBefore(refs)` | 请求前调用。`refs` 包含 `data`、`loading`、`error`、`uploadProgress`、`downloadProgress` | - |
| `onTransform(response, refs)` | 在赋值给 `value` 前转换响应数据 | - |
| `onSuccess(response, refs)` | 请求成功时调用 | - |
| `onError(error, refs)` | 请求错误时调用 | - |
| `onAfter(refs)` | 请求完成后调用（无论成功或失败） | - |

### 额外属性

返回值元组的第三个元素，包含以下属性：

| 属性 | 描述 |
| --- | --- |
| `loading` | 加载状态 ref |
| `error` | 错误状态 ref |
| `uploadProgress` | 上传进度 ref |
| `downloadProgress` | 下载进度 ref |
| `abort` | 中止请求函数 |
| `resetValue` | 用于 value 重置 |

### Runner 增强

Runner（返回值元组的第二个元素）包含所有额外属性，因此可以直接访问而无需解构第三个元素。

之前：

```html
<script setup>
const [users, getUsers, { loading }] = useAxle({
  method: 'get',
  url: '/user',
})
</script>

<template>
  <span>{{ loading ? 'loading...' : users }}</span>
  <button @click="getUsers">发送请求</button>
</template>
```

之后：

```html
<script setup>
const [users, getUsers] = useAxle({
  method: 'get',
  url: '/user',
})
</script>

<template>
  <span>{{ getUsers.loading.value ? 'loading...' : users }}</span>
  <button @click="getUsers">发送请求</button>
</template>
```
