# defaultDocument

The browser's `document` reference. In Node or SSR, the value is `undefined`.

### Usage

```ts
import { defaultDocument } from 'rattail'

const app = defaultDocument?.querySelector('#app')
```

### Type

`Document | undefined`
