# doubleRaf

创建一个基于 `Promise` 的双重 `requestAnimationFrame`，在两帧之后 `resolved`。

### 用法

```ts
import { doubleRaf } from 'rattail'

await doubleRaf()
console.log('两帧后')
```

### 返回值

| 类型            |
| --------------- |
| `Promise<void>` |
