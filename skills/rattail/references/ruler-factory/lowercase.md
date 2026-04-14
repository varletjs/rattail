---
category: Validators
---

# lowercase

String must equal its `toLowerCase()` form.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L223-L234)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L214-L225)

## Usage

```ts
r().string().lowercase('Bad').done()
```

## Source

[lowercase implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L453-L461)

```ts
function lowercase(message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'string' && (!isString(value) || value !== value.toLowerCase())) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
