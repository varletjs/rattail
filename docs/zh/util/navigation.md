# navigation

浏览器级别的导航 API，用于处理真实的页面跳转，包括跨域重定向、新窗口打开和强制整页刷新等场景。

::: tip Router 与 Navigation 的区别

- **Router**（如 vue-router、react-router）：负责单页应用内部的页面切换，不会触发真实的浏览器导航。
- **Navigation**：负责浏览器级别的跳转 —— 跨域重定向、新窗口/标签页打开、强制整页刷新等。
  :::

### 使用

#### push

导航到指定 URL，在浏览器历史记录中新增一条记录。

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

导航到指定 URL，替换浏览器历史记录中的当前条目。

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

在新窗口/标签页中打开指定 URL。

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

返回上一页。

```js
import { navigation } from 'rattail'

navigation.back()
```

#### go

在历史记录中前进或后退指定步数。

```js
import { navigation } from 'rattail'

navigation.go(-1) // 后退 1 步
navigation.go(-2) // 后退 2 步
navigation.go(1) // 前进 1 步
```

#### buildNavigationUrl

根据导航目标构建 URL 字符串，不执行任何跳转。适用于仅需要获取最终 URL 的场景。

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

### 参数

#### NavigationTarget

| 属性    | 类型                     | 默认值      | 说明                                                        |
| ------- | ------------------------ | ----------- | ----------------------------------------------------------- |
| `to`    | `string`                 |             | 目标 URL，可以包含已有的查询字符串和哈希                    |
| `query` | `Record<string, string>` | `{}`        | 追加的查询参数（与 `to` 中已有的查询参数合并）              |
| `hash`  | `string`                 | `undefined` | 哈希片段（如 `'#section'`），提供时会覆盖 `to` 中已有的哈希 |

#### 方法

| 方法                         | 参数                         | 说明                          |
| ---------------------------- | ---------------------------- | ----------------------------- |
| `push(target)`               | `string \| NavigationTarget` | 跳转并新增历史记录            |
| `replace(target)`            | `string \| NavigationTarget` | 跳转并替换当前历史记录        |
| `open(target)`               | `string \| NavigationTarget` | 在新窗口/标签页中打开         |
| `back()`                     |                              | 返回上一页                    |
| `go(delta)`                  | `number`                     | 按历史记录步数前进或后退      |
| `buildNavigationUrl(target)` | `string \| NavigationTarget` | 仅构建 URL 字符串，不执行跳转 |
