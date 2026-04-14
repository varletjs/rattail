# Request Functions

::: tip
The examples below use `get` and `post`, but `options`, `head`, `delete`, `patch`, and `put` are also supported.
:::

### GET

#### JSON (default)

```ts
const data = await axle.get('/url', { id: 1 })
```

Equivalent axios call:

```ts
const { data } = await axios.get('/url', { params: { id: 1 } })
```

#### Blob

```ts
const blob = await axle.getBlob('/url', { id: 1 })
```

Equivalent axios call:

```ts
const { data } = await axios.get('/url', {
  params: { id: 1 },
  responseType: 'blob',
})
```

#### Text

```ts
const text = await axle.getText('/url', { id: 1 })
```

Equivalent axios call:

```ts
const { data } = await axios.get('/url', {
  params: { id: 1 },
  responseType: 'text',
})
```

#### Document

```ts
const doc = await axle.getDocument('/url', { id: 1 })
```

Equivalent axios call:

```ts
const { data } = await axios.get('/url', {
  params: { id: 1 },
  responseType: 'document',
})
```

#### ArrayBuffer

```ts
const buffer = await axle.getArrayBuffer('/url', { id: 1 })
```

Equivalent axios call:

```ts
const { data } = await axios.get('/url', {
  params: { id: 1 },
  responseType: 'arraybuffer',
})
```

#### Stream

```ts
const stream = await axle.getStream('/url', { id: 1 })
```

Equivalent axios call:

```ts
const { data } = await axios.get('/url', {
  params: { id: 1 },
  responseType: 'stream',
})
```

### POST

#### JSON (default)

```ts
const data = await axle.post('/url', { name: 'foo' })
```

Equivalent axios call:

```ts
const { data } = await axios.post('/url', { name: 'foo' })
```

#### application/x-www-form-urlencoded

```ts
const data = await axle.postUrlEncode('/url', { name: 'foo' })
```

Equivalent axios call:

```ts
const { data } = await axios.post('/url', qs.stringify({ name: 'foo' }), {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
```

#### multipart/form-data

```ts
const data = await axle.postMultipart('/url', {
  name: 'foo',
  file: new File(),
})
```

Equivalent axios call:

```ts
const formData = new FormData()
formData.append('name', 'foo')
formData.append('file', new File())

const { data } = await axios.post('/url', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
})
```
