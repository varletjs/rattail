---
category: Transform
---

# toUpperCase

Uppercases strings in transformer before validation.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L278-L283)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L269-L274)

## Usage

```ts
r().string().toUpperCase().done()
```

## Source

[toUpperCase implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L609-L612)

```ts
function toUpperCase() {
  ctx.shouldToUpperCase = true
  return ctx
}
```
