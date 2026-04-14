---
category: Validators
---

# endsWith

String suffix check.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L223-L234)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L214-L225)

## Usage

```ts
r().string().endsWith('x', 'Bad').done()
```

## Source

[endsWith implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L419-L427)

```ts
function endsWith(v: string, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'string' && (!isString(value) || !value.endsWith(v))) {
      return new Error(getMessage(message))
    }
  }, params)

  return ctx
}
```
