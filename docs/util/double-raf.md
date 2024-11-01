# doubleRaf

Creates a Promise-based double `requestAnimationFrame` that resolves after two frames.

### Usage

```ts
import { doubleRaf } from 'rattail'

await doubleRaf()
console.log('Two frames later')
```

### Return

| Type            |
| --------------- |
| `Promise<void>` |
