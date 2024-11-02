# getParentScroller

查找元素的最近可滚动父级元素。如果没有找到滚动父级，则返回 `window`。

### 使用

```ts
import { getParentScroller } from 'rattail'

const scroller = getParentScroller(document.querySelector('div'))
```

### 参数

| 参数 | 类型          | 默认值 |
| ---- | ------------- | ------ |
| `el` | `HTMLElement` |        |

### 返回值

| 类型                    |
| ----------------------- |
| `HTMLElement \| Window` |
