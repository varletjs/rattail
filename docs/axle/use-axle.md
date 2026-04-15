# Vue Composition API

Axle provides the usage of Vue Composition API style.

### Import

```ts
import { createUseAxle } from 'rattail/axle/use'
```

### Create useAxle

```ts
import { createAxle } from 'rattail/axle'
import { createUseAxle } from 'rattail/axle/use'

const axle = createAxle({ baseURL: '/api' })

const useAxle = createUseAxle({ axle })
```

### Basic Usage

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
  <button @click="getUsers">Send Request</button>
  <button @click="abort">Abort Request</button>
</template>
```

### Options

| Option | Description | Default |
| --- | --- | --- |
| `value` | Request initial value | - |
| `method` | Request method | - |
| `url` | Request url, can be a getter function | - |
| `immediate` | Whether to send the request immediately | `true` |
| `resetValue` | Whether to reset value before requesting | `false` |
| `cloneResetValue` | Clone strategy when resetting value. `true` for deep clone, or a custom clone function `(value) => value` | `false` |
| `params` | Request params, can be a getter function | `{}` |
| `config` | Axios config, can be a getter function | `{}` |
| `onBefore(refs)` | Called before request. `refs` includes `data`, `loading`, `error`, `uploadProgress`, `downloadProgress` | - |
| `onTransform(response, refs)` | Transform the response data before assigning to `value` | - |
| `onSuccess(response, refs)` | Called on request success | - |
| `onError(error, refs)` | Called on request error | - |
| `onAfter(refs)` | Called after request completes (success or error) | - |

### Runner Enhancement

The runner (second element in the returned tuple) includes all extra properties, so you can access them directly without destructuring the third element.

Before:

```html
<script setup>
const [users, getUsers, { loading }] = useAxle({
  method: 'get',
  url: '/user',
})
</script>

<template>
  <span>{{ loading ? 'loading...' : users }}</span>
  <button @click="getUsers">Send Request</button>
</template>
```

After:

```html
<script setup>
const [users, getUsers] = useAxle({
  method: 'get',
  url: '/user',
})
</script>

<template>
  <span>{{ getUsers.loading.value ? 'loading...' : users }}</span>
  <button @click="getUsers">Send Request</button>
</template>
```

### Extra Properties

The third element of the returned tuple, which contains the following properties:

| Property | Description |
| --- | --- |
| `loading` | Loading state ref |
| `error` | Error state ref |
| `uploadProgress` | Upload progress ref |
| `downloadProgress` | Download progress ref |
| `abort` | Abort request function |
| `resetValue` | Used to reset value |
