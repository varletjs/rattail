# Getting Started

Axle is a progressive request tool based on [axios](https://axios-http.com/). It does not destroy the original abilities of axios, and helps you process requests more easily.

### Import

```ts
import { createAxle } from 'rattail/axle'
```

### Create Instance

```ts
const axle = createAxle({
  baseURL: '/api',
})
```

The `createAxle` function accepts all [axios config](https://axios-http.com/) options.

### Basic Usage

```ts
axle.get('/user', { current: 1, pageSize: 10 })

axle.post('/user', { name: 'Axle' })
```

### Composition API

```ts
import { createUseAxle } from 'rattail/axle/use'

const useAxle = createUseAxle({ axle })

const [users, getUsers] = useAxle({
  method: 'get',
  url: '/user',
})
```
