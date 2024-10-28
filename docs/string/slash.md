# slash

Convert all backslashes (`\`) in a path to forward slashes (`/`). If the path starts with `\\?\`, indicating an extended-length path, it is returned as-is without modification.

### Usage

```ts
import { slash } from 'rattail'

slash('C:\\path\\to\\file')
// return 'C:/path/to/file'

slash('\\\\?\\C:\\path\\to\\file')
// return '\\\\?\\C:\\path\\to\\file' (unmodified)
```

### Arguments

| Arg    |   Type   | Defaults |
| ------ | :------: | -------: |
| `path` | `string` |          |

### Return

|   Type   |
| :------: |
| `string` |
