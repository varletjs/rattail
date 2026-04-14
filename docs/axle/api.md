# API Definition

Use `createApi` to define APIs for centralized management and type-safe endpoint declarations. Highly recommended to use with [rt api](/cli/api) to generate API call code directly from OpenAPI/Swagger schema — type-safe, time-saving, and AI friendly.

### Import

```ts
import { createApi } from 'rattail/axle/api'
```

### Setup

```ts
import { createAxle } from 'rattail/axle'
import { createUseAxle } from 'rattail/axle/use'
import { createApi } from 'rattail/axle/api'

const axle = createAxle({ baseURL: '/api' })
const useAxle = createUseAxle({ axle })
const api = createApi(axle, useAxle)
```

### Define APIs

Use generic types to declare the response type and request body type. Path parameters use `:param` syntax.

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

### Invoke APIs

Each API object provides two methods:

- `.use()` — returns a `useAxle` tuple for Vue Composition API usage
- `.load()` — performs an imperative request and returns the response directly

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
