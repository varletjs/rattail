# download

Trigger browser download, supporting downloading via file `url`, `Blob`, `File`.

### Usage

```ts
import { download } from 'rattail'

download('/hello.txt', 'hello.txt')
download(new Blob(['hello']), 'hello.txt')
download(new File(['helle'], 'hello.txt', { type: 'text/plain' }), 'hello.txt')
```

### Arguments

| Arg        | Type                     | Defaults |
| ---------- | ------------------------ | -------- |
| `value`    | `string \| Blob \| File` |          |
| `filename` | `string`                 |          |
