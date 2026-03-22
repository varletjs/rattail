# storage

增强 `localStorage` 和 `sessionStorage`，并通过 `createCookieStorage` 提供基于 Cookie 的存储方案。均支持数据的自动 JSON `stringify` 和 `parse`。

### 使用

#### localStorage

```js
import { localStorage } from 'rattail'

localStorage.set('key', { a: 1 }) // 自动 json stringify
localStorage.get('key') // return { a: 1 }，自动 json parse
localStorage.remove('key') // 等价于 localStorage.removeItem('key')
```

#### sessionStorage

```js
import { sessionStorage } from 'rattail'

sessionStorage.set('key', { a: 1 }) // 自动 json stringify
sessionStorage.get('key') // return { a: 1 }，自动 json parse
sessionStorage.remove('key') // 等价于 sessionStorage.removeItem('key')
```

#### createCookieStorage

创建一个基于 Cookie 的存储实例。`set` 时会自动 JSON 序列化，`get` 时会自动 JSON 解析。可提供默认的 Cookie 属性配置，调用时传入的选项会与默认选项合并。

```js
import { createCookieStorage } from 'rattail'

const cookieStorage = createCookieStorage()

// 设置
cookieStorage.set('token', 'abc123')
cookieStorage.set('user', { name: 'John' })

// 获取（自动 JSON 解析）
cookieStorage.get('token') // 'abc123'
cookieStorage.get('user') // { name: 'John' }

// 移除
cookieStorage.remove('token')
```

设置默认 Cookie 属性，调用时传入的选项会与默认选项合并。

```js
const cookieStorage = createCookieStorage({ expires: 7, path: '/' })

// 调用时覆盖默认选项
cookieStorage.set('session', 'xyz', { expires: 1, secure: true })
cookieStorage.remove('session', { path: '/app' })
```

#### CookieAttributes

| 属性         | 类型                                                         | 描述                                   |
| ------------ | ------------------------------------------------------------ | -------------------------------------- |
| `expires`    | `number \| Date`                                             | 过期时间。数字表示从创建时起的天数。   |
| `path`       | `string`                                                     | Cookie 可用的路径，默认为 `'/'`。      |
| `domain`     | `string`                                                     | Cookie 可用的域名。                    |
| `secure`     | `boolean`                                                    | 是否要求通过 HTTPS 传输。              |
| `sameSite`   | `'strict' \| 'Strict' \| 'lax' \| 'Lax' \| 'none' \| 'None'` | 控制 Cookie 的跨域发送策略。           |
| `[property]` | `any`                                                        | 其他符合 RFC 6265 规范的 Cookie 属性。 |
