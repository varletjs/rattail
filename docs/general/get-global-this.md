# getGlobalThis

Retrieve the global object based on the current environment

### Usage

```ts
import { getGlobalThis } from 'rattail'

// returns `window` in browser, `global` in Node.js, 
// or `self` in web worker
const globalThis = getGlobalThis() 
```

### Return

|        Type         |
| :-----------------: |
| `typeof globalThis` |
