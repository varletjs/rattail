# navigation

Browser-level navigation API for handling real page jumps, including cross-origin redirects, new window opening, and forced full-page reloads.

::: tip Router vs Navigation

- **Router** (e.g. vue-router, react-router): Handles in-app page transitions within a Single Page Application, no real browser navigation occurs.
- **Navigation**: Handles browser-level jumps — cross-origin redirects, opening new windows/tabs, forcing full-page reloads, etc.
  :::

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
navigation.push({ to: 'https://external.com/docs', query: { v: '1.0' }, hash: '#api' })
// => https://external.com/docs?v=1.0#api
```

#### replace

Navigate to a URL, replacing the current entry in the browser history.

```js
import { navigation } from 'rattail'

navigation.replace('/settings')
navigation.replace('https://external.com/profile')
navigation.replace({ to: '/settings', query: { tab: 'info' }, hash: '#profile' })
// => /settings?tab=info#profile
navigation.replace({ to: 'https://external.com/settings', query: { tab: 'info' }, hash: '#account' })
// => https://external.com/settings?tab=info#account
```

#### open

Open a URL in a new window/tab.

```js
import { navigation } from 'rattail'

navigation.open('/help')
navigation.open('https://external.com/help')
navigation.open({ to: '/docs', query: { v: '1.0' }, hash: '#getting-started' })
// => /docs?v=1.0#getting-started
navigation.open({ to: 'https://external.com/docs', query: { v: '1.0' }, hash: '#api' })
// => https://external.com/docs?v=1.0#api
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

Build a URL string from a navigation target, without performing any navigation. Useful when you only need the resulting URL.

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
