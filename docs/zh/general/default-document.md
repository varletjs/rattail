# defaultDocument

浏览器的 `document` 引用。在 Node 或 SSR 中为 `undefined`。

### 使用

```ts
import { defaultDocument } from 'rattail'

const app = defaultDocument?.querySelector('#app')
```

### 类型

`Document | undefined`
