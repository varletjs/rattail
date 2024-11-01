# raf

创建一个基于 `Promise` 的 `requestAnimationFrame`，在下一帧时 `resolved`。

### 用法

```ts
import { raf } from 'rattail'

await raf()
console.log('下一帧')
```

### 返回值

| 类型            |
| --------------- |
| `Promise<void>` |
