# createElement

通过拍平配置和可选子节点，创建原生 HTML 或 SVG 节点。

### 使用

```ts
import { createElement } from 'rattail'

const button = createElement('button', {
  class: 'submit',
  disabled: false,
  'aria-label': '保存',
  onClick: () => console.log('saved'),
}, '保存')

const image = createElement('img', { src: '/avatar.png', alt: '头像', loading: 'lazy' })
```

### 参数

| 参数 | 说明 |
| --- | --- |
| `tag` | HTML、自定义元素或 SVG 标签 |
| `options` | 可选的拍平属性和事件配置 |
| `children` | 可选的节点、文本、数字或嵌套数组 |

已知标签推导对应原生类型，例如 `HTMLImageElement`；动态 HTML 标签返回 `HTMLElement`。函数调用时访问 `document`，导入包不要求存在 DOM。

### 拍平配置

可写 HTML property 使用原生赋值，其余字段作为 attribute 设置，包括只读的 `form`、`list` 引用、iframe 的 `sandbox` 和 SVG 字段。支持 `class` 和 `className`。未知 attribute 接受字符串、数字、布尔值或空值。TypeScript 禁止覆盖原生方法与只读 DOM 状态。

HTML 布尔 attribute 在值为 `false`、`null` 时移除；ARIA 和 data 属性保留 `'false'`。忽略 `undefined` 配置。先注册监听器再设置资源 URL，先设置约束和子节点再设置当前表单值。

`style` 支持 CSS 字符串、camelCase 属性和自定义属性对象，普通值需要显式单位，`null` 清空样式。`dataset` 将值转成字符串，空值移除条目；优先于同名的拍平 `data-*` 配置。

```ts
createElement('input', { value: '150', type: 'range', min: '100', max: '200', form: 'settings' })
createElement('div', {
  style: { color: 'red', width: '24px', '--gap': 8 },
  dataset: { userId: 42, enabled: false },
})
```

### 事件

统一使用 `onXxx`，内部调用原生 `addEventListener`。支持函数、`handleEvent` 对象和只读的 `[listener, options]` 元组。

```ts
const controller = new AbortController()

createElement('button', {
  onClick: [() => console.log('clicked'), { signal: controller.signal }],
  onKeydownOnce: event => console.log(event.key),
  onFocusCapture: () => console.log('focused'),
  'on:CustomReady': event => console.log(event.type),
})
```

元组选项支持 `capture`、`once`、`passive`、`signal`。`Once`、`Passive`、`Capture` 后缀可任意组合，优先于元组中冲突的选项。

普通事件名转成 kebab case，例如 `onClick → click`、`onMyEvent → my-event`；`on:CustomReady` 保留精确名称。空值监听器忽略。函数保留原生 `this`，可用原函数引用与 capture 标记移除监听器。不支持嵌套 `on` 对象或 `onclick` 等小写写法。

### 子节点

单值通过 `normalizeToArray` 归一化；递归处理嵌套数组，使用原生 DOM 操作移动节点，字符串与数字转为文本节点。忽略空值和布尔值。支持跨窗口节点及 document fragment。

```ts
createElement('p', {}, '单个子节点')
createElement('div', {}, [createElement('strong', {}, '标题'), ['文本', 0, null, false]])
```

`children`、`textContent`、`innerHTML` 只能选择一种提供内容。子节点字符串不解析 HTML，需要解析时显式使用 `innerHTML`。

### SVG

```ts
const svg = createElement('svg', { viewBox: '0 0 20 20' },
  createElement('circle', { namespace: 'svg', cx: 10, cy: 10, r: 8, 'stroke-width': 2 }))
```

根标签 `svg` 自动选择 SVG，其他标签及 `a` 等重名标签需要 `namespace: 'svg'`。attribute 保留大小写；`xlink:*`、`xml:*`、`xmlns` 使用原生命名空间。
