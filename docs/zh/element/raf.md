# raf

创建一个基于 `Promise` 的 `requestAnimationFrame`，在下一帧时解析。

### 用法

```ts
import { raf } from 'rattail'

raf().then(() => {
  console.log('下一帧动画')
})
```

### 返回值

| 类型            |
| --------------- |
| `Promise<void>` |
