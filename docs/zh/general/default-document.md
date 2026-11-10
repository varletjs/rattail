# defaultDocument

在模块求值时保存的 SSR 安全 document 引用。

### 使用

```ts
import { defaultDocument } from 'rattail'

defaultDocument?.querySelector('#app')
```

### 值

| 环境 | 值 |
| --- | --- |
| 浏览器 | `window.document` |
| 没有 `window` 的 Node、SSR、worker | `undefined` |
| 存在 `window` 但没有 document | `undefined` |

公开类型为 `Document | undefined`。这是普通常量，导入后替换全局对象或安装 DOM 不会更新它。调用 DOM 方法前需要判空。实现复用 `inBrowser`，不依赖 Vue。
