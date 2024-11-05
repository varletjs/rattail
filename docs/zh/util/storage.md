# storage

增强 `localStorage` 和 `sessionStorage`，支持数据的自动 json `stringify` 和 `parse`，并保留所有原生 API。

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
