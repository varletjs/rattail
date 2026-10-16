---
category: Util
---

# storage

Enhance `localStorage` and `sessionStorage`, and provide cookie-based storage via `createCookieStorage`. All support automatic JSON `stringify` and `parse` of data.

## Documentation

- [English](https://rattail.varletjs.org/util/storage)
- [Chinese docs](https://rattail.varletjs.org/zh/util/storage)

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

## Type declarations

```ts
// @ts-expect-error overwrite type definition
import Cookie from 'js-cookie'
import { isString } from '../general'
import { getGlobalThis } from '../general/getGlobalThis'

export interface Storage extends globalThis.Storage {
  set(key: string, value: any): void
  get(key: string): any
  remove(key: string): void
}

export interface CookieAttributes {
  expires?: number | Date | undefined
  path?: string | undefined
  domain?: string | undefined
  secure?: boolean | undefined
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined
  [property: string]: any
}

export interface CookieStorage {
  set(key: string, value: any, options?: CookieAttributes): void
  get(key: string): any
  remove(key: string, options?: CookieAttributes): void
}

export function createStorage(storage: globalThis.Storage): Storage {
  return {
    ...storage,

    set(key: string, value: unknown) {
      if (value == null) {
        return
      }

      if (!isString(value)) {
        value = JSON.stringify(value)
      }

      storage.setItem(key, value as string)
    },

    get(key: string) {
      const data = storage.getItem(key) as string

      try {
        return JSON.parse(data)
      } catch (err) {
        return data
      }
    },

    remove(key: string): void {
      storage.removeItem(key)
    },
  }
}

export function createCookieStorage(options: CookieAttributes = {}): CookieStorage {
  const defaultOptions = options

  return {
    set(key: string, value: unknown, options: CookieAttributes = {}) {
      if (value == null) {
        return
      }

      if (!isString(value)) {
        value = JSON.stringify(value)
      }

      Cookie.set(key, value as string, { ...defaultOptions, ...options })
    },

    get(key: string) {
      const data = Cookie.get(key) as string

      try {
        return JSON.parse(data)
      } catch (err) {
        return data
      }
    },

    remove(key: string, options: CookieAttributes = {}): void {
      Cookie.remove(key, { ...defaultOptions, ...options })
    },
  }
}

export const sessionStorage = createStorage(getGlobalThis().sessionStorage)

export const localStorage = createStorage(getGlobalThis().localStorage)
```
