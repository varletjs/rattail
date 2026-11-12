# createElement

创建 HTML 或 SVG 节点，可同时设置属性、事件和子节点。

### 使用

```ts
import { createElement } from 'rattail'

const button = createElement(
  'button',
  {
    class: 'submit',
    'aria-label': '保存',
    onClick: () => console.log('已保存'),
  },
  '保存',
)
```

### 参数

| 参数 | 说明 |
| --- | --- |
| `tag` | HTML、自定义元素或 SVG 标签名 |
| `options` | 可选的拍平配置，可直接填写 `src`、`class`、`aria-label`、`onClick` 等字段 |
| `children` | 可选的节点、字符串、数字或嵌套子节点数组 |

### 返回值

返回创建的节点。TypeScript 根据已知标签推导类型，例如 `button` 对应 `HTMLButtonElement`。

### 注意事项

- 用 `onClick` 绑定监听器，用 `onClick: [listener, { once: true }]` 设置监听选项。用 `'on:CustomReadyOnce'` 监听名称恰好为 `CustomReadyOnce` 的事件。
- `style` 接受 CSS 字符串或样式对象。数据属性可通过 `dataset` 或 `'data-id'` 等字段设置。
- `children` 中的字符串和数字作为文本插入，空值和布尔值会跳过。`children`、`textContent`、`innerHTML` 任选一种设置内容。
- `svg` 标签自动创建 SVG 节点。其他 SVG 标签需要传入 `namespace: 'svg'`，例如 `createElement('circle', { namespace: 'svg', r: 8 })`。
