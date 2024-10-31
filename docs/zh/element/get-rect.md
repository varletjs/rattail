# getRect

获取元素或窗口的尺寸和位置，返回一个 `DOMRect` 对象。

### 用法

```ts
import { getRect } from 'rattail'

const rect = getRect(document.querySelector('div'))
```

### 参数

| 参数      | 类型      | 默认值   |
| --------- | --------- | -------- |
| `element` | `Element` | `Window` |

### 返回值

| 类型      |
| --------- |
| `DOMRect` |
