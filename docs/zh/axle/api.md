# API 定义

使用 `createApi` 定义 API，实现集中管理和类型安全的端点声明。强烈推荐配合 [rt api](/zh/cli/api) 使用，直接通过 OpenAPI/Swagger schema 生成 API 调用代码，类型安全，省时省力，AI 友好。

### 引入

```ts
import { createApi } from 'rattail/axle/api'
```

### 初始化

```ts
import { createAxle } from 'rattail/axle'
import { createUseAxle } from 'rattail/axle/use'
import { createApi } from 'rattail/axle/api'

const axle = createAxle({ baseURL: '/api' })
const useAxle = createUseAxle({ axle })
const api = createApi(axle, useAxle)
```

### 定义 API

使用泛型声明响应类型和请求体类型。路径参数使用 `:param` 语法。

```ts
interface Response<T> {
  data: T
  code: number
  message: string
  success: boolean
}

interface User {
  id: string
  name: string
}

interface CreateUser {
  name: string
}

interface UpdateUser {
  name: string
}

export const apiGetUsers = api<Response<User[]>>('/user', 'get')
export const apiGetUser = api<Response<User>>('/user/:id', 'get')
export const apiCreateUser = api<Response<User>, CreateUser>('/user', 'post')
export const apiUpdateUser = api<Response<User>, UpdateUser>('/user/:id', 'put')
export const apiDeleteUser = api<Response<User>>('/user/:id', 'delete')
```

### 调用 API

每个 API 对象提供两个方法：

- `.use()` — 返回 `useAxle` 元组，用于 Vue 组合式 API
- `.load()` — 执行命令式请求，直接返回响应数据

```ts
const route = useRoute()

const [users, getUsers] = apiGetUsers.use<Response<User[]>>()

const [user, getUser] = apiGetUser.use<Response<User>>({
  pathParams: () => ({ id: route.params.id }),
})

async function handleCreate(params: CreateUser) {
  const { success } = await apiCreateUser.load(params)

  if (success) {
    getUsers()
  }
}

async function handleUpdate(params: UpdateUser, id: string) {
  const { success } = await apiUpdateUser.load(params, { id })

  if (success) {
    getUsers()
  }
}

async function handleDelete(id: string) {
  const { success } = await apiDeleteUser.load({}, { id })

  if (success) {
    getUsers()
  }
}
```
