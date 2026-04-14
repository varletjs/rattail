---
category: String
---

# randomColor

Generate a random hexadecimal color string.

## Documentation

- [English](https://rattail.varletjs.org/string/random-color)
- [Chinese docs](https://rattail.varletjs.org/zh/string/random-color)

### Usage

```ts
import { randomColor } from 'rattail'

randomColor() // Generates a random hex color, e.g., '#a1b2c3'
```

### Return

|   Type   |
| :------: |
| `string` |

## Type declarations

```ts
export function randomColor() {
  const letters = '0123456789abcdef'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}
```
