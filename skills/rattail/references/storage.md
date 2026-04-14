---
category: Util
---

# storage

Enhance `localStorage` and `sessionStorage`, support automatic json `stringify` and `parse` of data, and retain all native APIs.

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

## Type declarations

```ts
import { isString } from '../general'
import { getGlobalThis } from '../general/getGlobalThis'

export interface Storage extends globalThis.Storage {
  set(key: string, value: any): void
  get(key: string): any
  remove(key: string): void
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

export const sessionStorage = createStorage(getGlobalThis().sessionStorage)

export const localStorage = createStorage(getGlobalThis().localStorage)
```
