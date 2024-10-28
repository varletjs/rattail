# getGlobalThis

根据当前环境获取全局对象

### Usage

```ts
import { getGlobalThis } from 'rattail'

getGlobalThis()
// 在浏览器中 return `window`，在 Node.js 中 return `global`，
// 在 web worker return `self`
```

### Return

|        Type         |
| :-----------------: |
| `typeof globalThis` |
