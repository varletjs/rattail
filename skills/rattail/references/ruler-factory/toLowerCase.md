---
category: Transform
---

# toLowerCase

Lowercases strings in transformer before validation.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L278-L283)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L269-L274)

## Usage

```ts
r().string().toLowerCase().done()
```

## Source

[toLowerCase implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L604-L607)

```ts
function toLowerCase() {
  ctx.shouldToLowerCase = true
  return ctx
}
```
