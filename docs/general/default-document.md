# defaultDocument

An SSR-safe document reference captured when the module is evaluated.

### Usage

```ts
import { defaultDocument } from 'rattail'

defaultDocument?.querySelector('#app')
```

### Value

| Environment | Value |
| --- | --- |
| Browser | `window.document` |
| Node, SSR or worker without `window` | `undefined` |
| A `window` without a document | `undefined` |

The public type is `Document | undefined`. This is a plain constant: replacing globals or installing a DOM after import does not update it. Guard it before DOM operations. The implementation reuses `inBrowser` without a Vue dependency.
