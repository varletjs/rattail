# createElement

Creates an HTML or SVG element with properties, attributes, listeners, and children.

### Usage

```ts
import { createElement } from 'rattail'

const button = createElement(
  'button',
  {
    class: 'submit',
    'aria-label': 'Save',
    onClick: () => console.log('saved'),
  },
  'Save',
)
```

### Arguments

| Argument | Description |
| --- | --- |
| `tag` | HTML, custom element, or SVG tag name |
| `options` | Optional flat configuration, such as `src`, `class`, `aria-label`, or `onClick` |
| `children` | Optional node, string, number, or nested array of children |

### Return

Returns the created element. TypeScript infers the type for known tags, such as `HTMLButtonElement` for `button`.

### Notes

- Use `onClick` for a listener or `onClick: [listener, { once: true }]` for listener options. Use `'on:CustomReadyOnce'` to listen for the exact event name `CustomReadyOnce`.
- Use `style` for CSS text or a style object. Use `dataset` or keys such as `'data-id'` for data attributes.
- Strings and numbers in `children` become text. Empty values and booleans are skipped. Choose one of `children`, `textContent`, or `innerHTML` to set content.
- The `svg` tag selects SVG automatically. For other SVG tags, pass `namespace: 'svg'`, as in `createElement('circle', { namespace: 'svg', r: 8 })`.
