---
category: Validators
---

# includes

Substring or array element presence (strict equality).

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L223-L234)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L214-L225)

## Usage

```ts
r().string().includes('x', 'Bad').done()
```

## Source

[includes implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L429-L441)

```ts
function includes(v: string, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'string' && (!isString(value) || !value.includes(v))) {
      return new Error(getMessage(message))
    }

    if (ctx.type === 'array' && (!isArray(value) || !value.includes(v))) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
