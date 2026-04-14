---
category: String
---

# slash

Convert all backslashes (`\`) in a path to forward slashes (`/`). If the path starts with `\\?\`, indicating an extended-length path, it is returned as-is without modification.

## Documentation

- [English](https://rattail.varletjs.org/string/slash)
- [Chinese docs](https://rattail.varletjs.org/zh/string/slash)

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

## Type declarations

```ts
export function slash(path: string) {
  const isExtendedLengthPath = path.startsWith('\\\\?\\')

  if (isExtendedLengthPath) {
    return path
  }

  return path.replace(/\\/g, '/')
}
```
