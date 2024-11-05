# storage

Enhance `localStorage` and `sessionStorage`, support automatic json `stringify` and `parse` of data, and retain all native APIs.

### Usage

#### localStorage

```js
import { localStorage } from 'rattail'

localStorage.set('key', { a: 1 }) // automatic json stringify
localStorage.get('key') // return { a: 1 }, automatic json parse
localStorage.remove('key') // same with localStorage.removeItem('key')
```

#### sessionStorage

```js
import { sessionStorage } from 'rattail'

sessionStorage.set('key', { a: 1 }) // automatic json stringify
sessionStorage.get('key') // return { a: 1 }, automatic json parse
sessionStorage.remove('key') // same with sessionStorage.removeItem('key')
```
