---
category: Transform
---

# trim

Sets a flag so string values are trimmed in transformer before validators run.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L278-L283)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L269-L274)

## Usage

```ts
r().string().trim().required('Required').done()
```

## Source

[trim implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L599-L602)

```ts
function trim() {
  ctx.shouldTrim = true
  return ctx
}
```
