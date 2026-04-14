---
category: Transform
---

# transformer

Active transform pipeline invoked from addRule before each validator; default applies trim/case flags for strings.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L278-L283)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L269-L274)

## Usage

```ts
Normally used indirectly via trim, toLowerCase, toUpperCase, or transform.
```

## Source

[transformer implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L614-L622)

```ts
function transformer(value: any) {
  if (ctx.type === 'string' && isString(value)) {
    ctx.shouldTrim && (value = value.trim())
    ctx.shouldToLowerCase && (value = value.toLowerCase())
    ctx.shouldToUpperCase && (value = value.toUpperCase())
  }

  return value
}
```
