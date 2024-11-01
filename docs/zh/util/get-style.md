# getStyle

获取给定 DOM 元素的计算 CSS 样式。

### 用法

```ts
import { getStyle } from 'rattail'

const elementStyle = getStyle(document.querySelector('div'))
```

### 参数

| 参数      | 类型      | 默认值 |
| --------- | --------- | ------ |
| `element` | `Element` |        |

### 返回值

| 类型                  |
| --------------------- |
| `CSSStyleDeclaration` |
