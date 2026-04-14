---
category: Validators
---

# gte

Greater than or equal (same idea as min for numbers).

## Documentation

- [English (README)](https://github.com/varletjs/ruler-factory/blob/main/README.md#L236-L256)
- [Chinese README](https://github.com/varletjs/ruler-factory/blob/main/README.zh-CN.md#L227-L247)

## Usage

```ts
r().number().gte(0, 'Bad').done()
```

## Source

[gte implementation](https://github.com/varletjs/ruler-factory/blob/main/src/index.ts#L479-L493)

```ts
function gte(v: number | bigint, message: RulerFactoryMessage, params?: P) {
  addRule((value) => {
    if (ctx.type === 'number' || ctx.type === 'bigint') {
      if (!isNumber(value) && typeof value !== 'bigint') {
        return new Error(getMessage(message))
      }

      if (value < v) {
        return new Error(getMessage(message))
      }
    }
  }, params)

  return ctx
}
```
