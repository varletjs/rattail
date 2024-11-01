# getAllParentScroller

获取元素的所有可滚动父级元素，包含 `window` 作为最后一项。

### 用法

```ts
import { getAllParentScroller } from 'rattail'

const scrollers = getAllParentScroller(document.querySelector('div'))
```

### 参数

| 参数 | 类型          | 默认值 |
| ---- | ------------- | ------ |
| `el` | `HTMLElement` |        |

### 返回值

| 类型                           |
| ------------------------------ |
| `Array<HTMLElement \| Window>` |
