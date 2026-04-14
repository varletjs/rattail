---
category: Validators
---

# lte

Less than or equal (same idea as max for numbers).

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L236-L256)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L227-L247)

## Usage

```ts
r().number().lte(0, 'Bad').done()
```

## Source

[lte implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L511-L525)

```ts
function lte(v: number | bigint, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'number' || ctx.type === 'bigint') {
      if (!isNumber(value) && typeof value !== 'bigint') {
        return new Error(getMessage(message))
      }

      if (value > v) {
        return new Error(getMessage(message))
      }
    }
  }, params)

  return ctx
}
```
