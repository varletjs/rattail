---
category: Validators
---

# max

Maximum length or numeric/bigint bound depending on `ctx.type`.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L223-L263)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L214-L254)

## Usage

```ts
r().string().max(3, 'Bad').done()
```

## Source

[max implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L361-L383)

```ts
function max(v: number | bigint, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'string' && (!isString(value) || value.length > v)) {
      return new Error(getMessage(message))
    }

    if (ctx.type === 'number' || ctx.type === 'bigint') {
      if (!isNumber(value) && typeof value !== 'bigint') {
        return new Error(getMessage(message))
      }

      if (value > v) {
        return new Error(getMessage(message))
      }
    }

    if (ctx.type === 'array' && (!isArray(value) || value.length > v)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
