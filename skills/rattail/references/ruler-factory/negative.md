---
category: Validators
---

# negative

Value must be less than 0.

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L236-L256)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L227-L247)

## Usage

```ts
r().number().negative('Bad').done()
```

## Source

[negative implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L543-L557)

```ts
function negative(message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'number' || ctx.type === 'bigint') {
      if (!isNumber(value) && typeof value !== 'bigint') {
        return new Error(getMessage(message))
      }

      if (value >= 0) {
        return new Error(getMessage(message))
      }
    }
  }, params)

  return ctx
}
```
