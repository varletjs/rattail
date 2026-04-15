# api

Generate API modules.

### Usage

```shell
rt api
```

### Config

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

### Programmatic Usage

```ts
import { api } from 'rattail/cli'

await api({
  input: './openapi.json',
  output: './src/apis/generated',
  preset: 'axle',
  ts: true,
})
```

### Output Preview

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

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `input` | `string` | `'./schema.json'` | Path to OpenAPI/Swagger schema |
| `output` | `string` | `'./src/apis/generated'` | Output directory |
| `base` | `string` | - | Base path of API endpoints |
| `ts` | `boolean` | `true` | Generate TypeScript code |
| `typesOnly` | `boolean` | `false` | Generate only types |
| `preset` | `'axle' \| 'axios'` | `'axle'` | Template preset |
| `overrides` | `boolean \| string[]` | `true` | Override existing files |
| `clean` | `boolean` | `false` | Clean output directory before generating |
| `excludeDeprecated` | `boolean` | `false` | Exclude deprecated endpoints |
