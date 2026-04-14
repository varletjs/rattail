---
category: Validators
---

# min

Minimum length (string), length (array), or numeric/bigint value depending on current `ctx.type`.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L223-L263)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L214-L254)

## Usage

```ts
r().string().min(3, 'Bad').done()
```

## Source

[min implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L337-L359)

```ts
function min(v: number | bigint, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'string' && (!isString(value) || value.length < v)) {
      return new Error(getMessage(message))
    }

    if (ctx.type === 'number' || ctx.type === 'bigint') {
      if (!isNumber(value) && typeof value !== 'bigint') {
        return new Error(getMessage(message))
      }

      if (value < v) {
        return new Error(getMessage(message))
      }
    }

    if (ctx.type === 'array' && (!isArray(value) || value.length < v)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
