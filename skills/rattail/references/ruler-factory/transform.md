---
category: Transform
---

# transform

Replaces the default string transformer with a custom (value) => any.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L278-L283)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L269-L274)

## Usage

```ts
const ctx = r().string()
ctx.transform((v) => v.slice(0, 10))
ctx.done()
```

## Source

[transform implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L624-L626)

```ts
function transform(v: (value: any) => any) {
  ctx.transformer = v
}
```
