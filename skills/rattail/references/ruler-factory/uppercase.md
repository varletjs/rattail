---
category: Validators
---

# uppercase

String must equal its `toUpperCase()` form.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L223-L234)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L214-L225)

## Usage

```ts
r().string().uppercase('Bad').done()
```

## Source

[uppercase implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L443-L451)

```ts
function uppercase(message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'string' && (!isString(value) || value !== value.toUpperCase())) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
