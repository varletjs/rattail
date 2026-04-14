---
category: Validators
---

# startsWith

String prefix check.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L223-L234)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L214-L225)

## Usage

```ts
r().string().startsWith('x', 'Bad').done()
```

## Source

[startsWith implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L409-L417)

```ts
function startsWith(v: string, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'string' && (!isString(value) || !value.startsWith(v))) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
