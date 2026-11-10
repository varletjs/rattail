# createElement

Creates a real HTML or SVG node from flat options and optional children.

### Usage

```ts
import { createElement } from 'rattail'

const button = createElement('button', {
  class: 'submit',
  disabled: false,
  'aria-label': 'Save',
  onClick: () => console.log('saved'),
}, 'Save')

const image = createElement('img', { src: '/avatar.png', alt: 'Avatar', loading: 'lazy' })
```

### Arguments

| Argument | Description |
| --- | --- |
| `tag` | HTML, custom element or SVG tag |
| `options` | Optional flat properties, attributes and listeners |
| `children` | Optional node, text, number or nested array |

Known tags infer native return types, such as `HTMLImageElement`. Dynamic HTML tags return `HTMLElement`. The function accesses `document` when called; importing the package does not require a DOM.

### Flat options

Writable HTML properties use native assignment. Other fields use attributes, including readonly `form` and `list` references, iframe `sandbox` and SVG fields. Both `class` and `className` are accepted. Unknown attributes accept strings, numbers, booleans or nullish values. TypeScript rejects native methods and readonly DOM state.

Boolean HTML attributes are removed for `false` or `null`. ARIA and data attributes preserve `'false'`. Undefined options are ignored. Listeners precede resource URLs; constraints and children precede current form values.

`style` accepts a CSS string or an object with camel-case names and custom properties. Standard values need explicit units. Null values clear styles. `dataset` stringifies values and removes nullish entries; it overrides matching flat `data-*` attributes.

```ts
createElement('input', { value: '150', type: 'range', min: '100', max: '200', form: 'settings' })
createElement('div', {
  style: { color: 'red', width: '24px', '--gap': 8 },
  dataset: { userId: 42, enabled: false },
})
```

### Events

Use `onXxx` listeners with native `addEventListener`. Values can be functions, `handleEvent` objects, or readonly `[listener, options]` tuples.

```ts
const controller = new AbortController()

createElement('button', {
  onClick: [() => console.log('clicked'), { signal: controller.signal }],
  onKeydownOnce: event => console.log(event.key),
  onFocusCapture: () => console.log('focused'),
  'on:CustomReady': event => console.log(event.type),
})
```

Tuple options support `capture`, `once`, `passive` and `signal`. `Once`, `Passive` and `Capture` suffixes can be combined in any order and override conflicting tuple flags.

Normal event names use kebab case: `onClick → click` and `onMyEvent → my-event`. Use `on:CustomReady` for an exact name. Nullish listeners are ignored. Functions preserve native `this` binding and can be removed with their original reference and capture flag. Nested `on` objects and lowercase handlers such as `onclick` are not supported.

### Children

Single values are normalized with `normalizeToArray`. Nested arrays are traversed, nodes are moved using native DOM operations, and strings/numbers become text nodes. Nullish and boolean children are ignored. Cross-window nodes and document fragments are supported.

```ts
createElement('p', {}, 'one child')
createElement('div', {}, [createElement('strong', {}, 'Title'), ['Text', 0, null, false]])
```

Only one of `children`, `textContent` or `innerHTML` may supply content. Children strings do not parse HTML; use explicit `innerHTML` when HTML parsing is intended.

### SVG

```ts
const svg = createElement('svg', { viewBox: '0 0 20 20' },
  createElement('circle', { namespace: 'svg', cx: 10, cy: 10, r: 8, 'stroke-width': 2 }))
```

The root `svg` tag automatically selects SVG; other SVG tags, including overlapping names such as `a`, need `namespace: 'svg'`. Attribute casing is preserved. `xlink:*`, `xml:*` and `xmlns` use native namespaces.
