# getGlobalThis

Retrieve the global object based on the current environment

### Usage

```ts
import { getGlobalThis } from 'rattail'

getGlobalThis()
// returns `window` in browser, `global` in Node.js,
// or `self` in web worker
```

### Return

|        Type         |
| :-----------------: |
| `typeof globalThis` |
