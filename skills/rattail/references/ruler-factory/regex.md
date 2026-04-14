---
category: Validators
---

# regex

String must match the given `RegExp`.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L223-L234)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L214-L225)

## Usage

```ts
r().string().regex(/^\d+$/, 'Digits only').done()
```

## Source

[regex implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L399-L407)

```ts
function regex(v: RegExp, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'string' && (!isString(value) || !v.test(value))) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
