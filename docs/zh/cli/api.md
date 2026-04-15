# api

解析 OpenAPI/Swagger schema 生成 API 模块。

### 使用

```shell
rt api
```

### 配置

```ts
import { defineConfig } from 'rattail/vite-plus'

export default defineConfig({
  rattail: {
    api: {
      input: './openapi.json',
      output: './src/apis/generated',
      preset: 'axle',
      ts: true,
    },
  },
})
```

### 编程式使用

```ts
import { api } from 'rattail/cli'

await api({
  input: './openapi.json',
  output: './src/apis/generated',
  preset: 'axle',
  ts: true,
})
```

### 生成结果预览

```ts
import { api } from '@/request'
import { type paths } from './_types'

/**
 * List Tenant's Users
 * @url /users
 * @method GET
 */
export const apiGetUsers = api<ApiGetUsersResponseBody, ApiGetUsersQuery, ApiGetUsersRequestBody>('/users', 'get')

/**
 * Create a Tenant's User
 * @url /users
 * @method POST
 */
export const apiCreateUser = api<ApiCreateUserResponseBody, ApiCreateUserRequestBody, ApiCreateUserRequestBody>(
  '/users',
  'post',
)

/**
 * Get a Tenant's User
 * @url /users/:uuid
 * @method GET
 */
export const apiGetUser = api<ApiGetUserResponseBody, ApiGetUserQuery, ApiGetUserRequestBody>('/users/:uuid', 'get')

/**
 * Update a Tenant's User
 * @url /users/:uuid
 * @method PUT
 */
export const apiUpdateUser = api<ApiUpdateUserResponseBody, ApiUpdateUserRequestBody, ApiUpdateUserRequestBody>(
  '/users/:uuid',
  'put',
)

/**
 * Delete a Tenant's User
 * @url /users/:uuid
 * @method DELETE
 */
export const apiDeleteUser = api<ApiDeleteUserResponseBody, ApiDeleteUserQuery, ApiDeleteUserRequestBody>(
  '/users/:uuid',
  'delete',
)

// ... more API functions

export type ApiGetUsers = paths['/users']['get']
export type ApiCreateUser = paths['/users']['post']
export type ApiGetUser = paths['/users/{uuid}']['get']
export type ApiUpdateUser = paths['/users/{uuid}']['put']
export type ApiDeleteUser = paths['/users/{uuid}']['delete']
// ...

export type ApiGetUsersQuery = ApiGetUsers['parameters']['query']
export type ApiGetUserQuery = ApiGetUser['parameters']['query']
// ...

export type ApiGetUsersRequestBody = undefined
export type ApiCreateUserRequestBody =
  | NonNullable<ApiCreateUser['requestBody']>['content']['application/json']
  | undefined
export type ApiUpdateUserRequestBody = ApiUpdateUser['requestBody']['content']['application/json']
// ...

export type ApiGetUsersResponseBody = ApiGetUsers['responses']['200']['content']['application/json']
export type ApiCreateUserResponseBody = ApiCreateUser['responses']['200']['content']['application/json']
export type ApiGetUserResponseBody = ApiGetUser['responses']['200']['content']['application/json']
// ...
```

### 选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `input` | `string` | `'./schema.json'` | OpenAPI/Swagger schema 文件路径 |
| `output` | `string` | `'./src/apis/generated'` | 输出目录 |
| `base` | `string` | - | API 端点的基础路径 |
| `ts` | `boolean` | `true` | 生成 TypeScript 代码 |
| `typesOnly` | `boolean` | `false` | 仅生成类型 |
| `preset` | `'axle' \| 'axios'` | `'axle'` | 模板预设 |
| `overrides` | `boolean \| string[]` | `true` | 覆盖已有文件 |
| `clean` | `boolean` | `false` | 生成前清空输出目录 |
| `excludeDeprecated` | `boolean` | `false` | 排除已废弃的端点 |
