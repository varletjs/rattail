# storage

Enhance `localStorage` and `sessionStorage`, and provide cookie-based storage via `createCookieStorage`. All support automatic JSON `stringify` and `parse` of data.

### Usage

#### localStorage

```js
import { localStorage } from 'rattail'

localStorage.set('key', { a: 1 }) // automatic json stringify
localStorage.get('key') // return { a: 1 }, automatic json parse
localStorage.remove('key') // same with localStorage.removeItem('key')
```

#### sessionStorage

```js
import { sessionStorage } from 'rattail'

sessionStorage.set('key', { a: 1 }) // automatic json stringify
sessionStorage.get('key') // return { a: 1 }, automatic json parse
sessionStorage.remove('key') // same with sessionStorage.removeItem('key')
```

#### createCookieStorage

Create a cookie-based storage instance. Values are automatically JSON-serialized on `set` and JSON-parsed on `get`. Default cookie attributes can be provided and will be merged with per-call options.

```js
import { createCookieStorage } from 'rattail'

const cookieStorage = createCookieStorage()

// set
cookieStorage.set('token', 'abc123')
cookieStorage.set('user', { name: 'John' })

// get (automatically JSON-parsed)
cookieStorage.get('token') // 'abc123'
cookieStorage.get('user') // { name: 'John' }

// remove
cookieStorage.remove('token')
```

Set default cookie attributes, which will be merged with per-call options.

```js
const cookieStorage = createCookieStorage({ expires: 7, path: '/' })

// override default options per call
cookieStorage.set('session', 'xyz', { expires: 1, secure: true })
cookieStorage.remove('session', { path: '/app' })
```

#### CookieAttributes

| Attribute    | Type                                                         | Description                                                   |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------- |
| `expires`    | `number \| Date`                                             | Expiration time. Number is interpreted as days from creation. |
| `path`       | `string`                                                     | Path where the cookie is available. Defaults to `'/'`.        |
| `domain`     | `string`                                                     | Domain where the cookie is available.                         |
| `secure`     | `boolean`                                                    | Whether the cookie requires HTTPS.                            |
| `sameSite`   | `'strict' \| 'Strict' \| 'lax' \| 'Lax' \| 'none' \| 'None'` | Cross-origin cookie sending behavior.                         |
| `[property]` | `any`                                                        | Any other cookie attribute conforming to RFC 6265.            |
