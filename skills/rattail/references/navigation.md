---
category: Util
---

# navigation

Browser-level navigation API for handling real page jumps, including cross-origin redirects, new window opening, and forced full-page reloads.

## Documentation

- [English](https://rattail.varletjs.org/util/navigation)
- [Chinese docs](https://rattail.varletjs.org/zh/util/navigation)

### Usage

#### push

Navigate to a URL, adding an entry to the browser history.

```js
import { navigation } from 'rattail'

navigation.push('/dashboard')
navigation.push('https://external.com/login')
navigation.push({ to: '/search', query: { q: 'vue', page: '1' } })
// => /search?q=vue&page=1
navigation.push({ to: '/docs', query: { v: '1.0' }, hash: '#section' })
// => /docs?v=1.0#section
navigation.push({ to: '/docs?lang=en#old', query: { v: '1.0' }, hash: '#new' })
// => /docs?lang=en&v=1.0#new
```

#### replace

Navigate to a URL, replacing the current entry in the browser history.

```js
import { navigation } from 'rattail'

navigation.replace('/settings')
navigation.replace({ to: '/settings', query: { tab: 'info' }, hash: '#profile' })
// => /settings?tab=info#profile
```

#### open

Open a URL in a new window/tab.

```js
import { navigation } from 'rattail'

navigation.open('/help')
navigation.open({ to: '/docs', query: { v: '1.0' }, hash: '#getting-started' })
// => /docs?v=1.0#getting-started
```

#### back

Go back to the previous page.

```js
import { navigation } from 'rattail'

navigation.back()
```

#### go

Navigate forward or backward by a given number of history entries.

```js
import { navigation } from 'rattail'

navigation.go(-1) // go back 1 entry
navigation.go(-2) // go back 2 entries
navigation.go(1) // go forward 1 entry
```

#### buildNavigationUrl

Build a URL string from a navigation target, without performing any navigation.

```js
import { buildNavigationUrl } from 'rattail'

buildNavigationUrl('/dashboard')
// => /dashboard
buildNavigationUrl({ to: '/search', query: { q: 'vue', page: '1' } })
// => /search?q=vue&page=1
buildNavigationUrl({ to: '/docs?lang=en', query: { v: '1.0' }, hash: '#section' })
// => /docs?lang=en&v=1.0#section
buildNavigationUrl({ to: '/docs#old', hash: '#new' })
// => /docs#new
```

### Arguments

#### NavigationTarget

| Property | Type                     | Defaults    | Description                                                                      |
| -------- | ------------------------ | ----------- | -------------------------------------------------------------------------------- |
| `to`     | `string`                 |             | Target URL, can contain existing query string and hash                           |
| `query`  | `Record<string, string>` | `{}`        | Query parameters to append (merged with existing query in `to`)                  |
| `hash`   | `string`                 | `undefined` | Hash fragment (e.g. `'#section'`), overrides existing hash in `to` when provided |

#### Methods

| Method                       | Arg                          | Description                              |
| ---------------------------- | ---------------------------- | ---------------------------------------- |
| `push(target)`               | `string \| NavigationTarget` | Navigate with new history entry          |
| `replace(target)`            | `string \| NavigationTarget` | Navigate replacing current history entry |
| `open(target)`               | `string \| NavigationTarget` | Open in new window/tab                   |
| `back()`                     |                              | Go back to previous page                 |
| `go(delta)`                  | `number`                     | Navigate by history delta                |
| `buildNavigationUrl(target)` | `string \| NavigationTarget` | Build URL string without navigating      |

## Type declarations

```ts
import { isString } from '../general'

export interface NavigationTarget {
  to: string
  query?: Record<string, any>
  hash?: string
}

export function buildNavigationUrl(target: string | NavigationTarget): string {
  if (isString(target)) {
    return target
  }

  const { to, query, hash } = target

  const hashIndex = to.indexOf('#')
  const toWithoutHash = hashIndex >= 0 ? to.slice(0, hashIndex) : to
  const existingHash = hashIndex >= 0 ? `#${to.slice(hashIndex + 1)}` : ''

  const queryIndex = toWithoutHash.indexOf('?')
  const base = queryIndex >= 0 ? toWithoutHash.slice(0, queryIndex) : toWithoutHash
  const existingQueryString = queryIndex >= 0 ? toWithoutHash.slice(queryIndex + 1) : ''

  const params = new URLSearchParams(existingQueryString)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      params.append(key, String(value))
    }
  }

  const queryString = params.toString()
  const finalHash = hash ?? existingHash

  let url = base

  if (queryString) {
    url += `?${queryString}`
  }

  if (finalHash) {
    url += finalHash
  }

  return url
}

export const navigation = {
  push(target: string | NavigationTarget) {
    window.location.assign(buildNavigationUrl(target))
  },

  replace(target: string | NavigationTarget) {
    window.location.replace(buildNavigationUrl(target))
  },

  open(target: string | NavigationTarget) {
    const url = buildNavigationUrl(target)
    window.open(url)
  },

  back() {
    window.history.back()
  },

  go(delta: number) {
    window.history.go(delta)
  },
}
```
