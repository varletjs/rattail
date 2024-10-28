# getGlobalThis

根据当前环境获取全局对象

### Usage

```ts
import { getGlobalThis } from 'rattail'

// 在浏览器中 return `window`，在 Node.js 中 return `global`，
// 在 web worker 返回 `self`
const globalThis = getGlobalThis()
```

### Return

|        Type         |
| :-----------------: |
| `typeof globalThis` |
