---
category: Validators
---

# length

Exact length for string or array.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L223-L263)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L214-L254)

## Usage

```ts
r().string().length(3, 'Bad').done()
```

## Source

[length implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L385-L397)

```ts
function length(v: number, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'string' && (!isString(value) || value.length !== v)) {
      return new Error(getMessage(message))
    }

    if (ctx.type === 'array' && (!isArray(value) || value.length !== v)) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
